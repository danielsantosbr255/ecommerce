"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { AddressResponse } from "@/types";
import Button from "@/components/ui/Button";
import { addressService } from "@/services/address";
import { Address } from "@/lib/schemas/address.schema";
import { AddressFormModal } from "../_components/AddressFormModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaPencilAlt, FaAddressBook, FaPlus, FaRegAddressCard, FaTrashAlt } from "react-icons/fa";

export default function AddressesComponent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressResponse | undefined>(undefined);

  const queryClient = useQueryClient();

  const {
    data: addresses,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["addresses"], queryFn: addressService.getAll, staleTime: 1000 * 60 * 5 });

  const saveMutation = useMutation({
    mutationFn: async (data: Address) => {
      return editingAddress ? await addressService.update(editingAddress.id, data) : await addressService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Endereço salvo com sucesso!");
      setModalOpen(false);
      setEditingAddress(undefined);
    },
    onError: (error) => {
      toast.error(error?.message || "Erro ao salvar endereço");
    },
  });

  const removeMutation = useMutation({
    mutationFn: (address: AddressResponse) => addressService.delete(address.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Endereço removido com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao remover endereço");
    },
  });

  const handleSave = (data: Address) => saveMutation.mutate(data);
  const handleEdit = (address?: AddressResponse) => {
    setEditingAddress(address);
    setModalOpen(true);
  };
  const handleRemove = (address: AddressResponse) => removeMutation.mutate(address);

  if (isLoading) return <p className="p-4 text-center">Carregando endereços...</p>;
  if (isError) return <p className="p-4 text-center text-tx-error">Erro ao carregar endereços.</p>;

  return (
    <div>
      <h2 className="flex items-center justify-between border-b border-lines font-semibold p-2">
        <span className="flex items-center gap-2 text-xl">
          <FaAddressBook size={25} className="text-primary" />
          Meus Endereços
        </span>
        <Button onClick={() => handleEdit(undefined)}>
          <FaPlus className="mr-1" size={12} /> Adicionar Endereço
        </Button>
      </h2>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 py-4">
        {addresses?.map((address) => (
          <article key={address.id} className="bg-bg-secondary flex flex-col gap-4 p-5 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <span className="flex w-full text-primary gap-2 font-semibold text-lg items-center">
                <FaRegAddressCard size={25} />
                {address.label} {address.isDefault ? "(Padrão)" : ""}
              </span>

              <span className="flex justify-end items-center gap-2">
                <button onClick={() => handleEdit(address)} className="cursor-pointer hover:scale-110 transition-all">
                  <FaPencilAlt className="text-primary" />
                </button>
                <button onClick={() => handleRemove(address)} className="cursor-pointer hover:scale-110 transition-all">
                  <FaTrashAlt className="text-tx-error" />
                </button>
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <p>
                <strong>Rua:</strong> {address.street}, Nº{address.number} - {address.complement}
              </p>
              <p>
                <strong>Bairro:</strong> {address.neighborhood}
              </p>
              <p>
                <strong>Cidade:</strong> {address.city}
              </p>
              <p>
                <strong>Estado:</strong> {address.state}
              </p>
              <p>
                <strong>Código Postal:</strong> {address.zipCode}
              </p>
              <p>
                <strong>País:</strong> {address.country}
              </p>
            </div>
          </article>
        ))}
      </section>

      <AddressFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSave}
        initialData={editingAddress}
        isSubmitting={saveMutation.isPending}
      />
    </div>
  );
}
