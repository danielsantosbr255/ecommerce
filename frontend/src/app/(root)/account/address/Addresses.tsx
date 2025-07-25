"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { addressService } from "@/services/address";
import { Address } from "@/lib/schemas/address.schema";
import { AddressFormModal } from "../_components/AddressFormModal";
import { AddressResponse } from "@/types";
import { toast } from "react-toastify";

export default function AddressesComponent() {
  const { data: addresses } = useQuery({
    queryKey: ["addresses"],
    queryFn: () => addressService.getAll(),
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressResponse | undefined>(undefined);

  const handleSave = async (data: Address) => {
    try {
      if (editingAddress) await addressService.update(editingAddress.id, data);
      else await addressService.create(data);
      setEditingAddress(undefined);
      toast.success("Endereço salvo com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar endereço");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Meus Endereços</h1>
        <button
          onClick={() => {
            setEditingAddress(undefined);
            setModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Adicionar Endereço
        </button>
      </div>

      <div className="space-y-2">
        {addresses?.map((addr, idx) => (
          <div key={idx} className="p-4 border rounded-md flex justify-between items-center">
            <div>
              <p className="font-bold">{addr.label}</p>
              <p>
                {addr.street}, {addr.number}
              </p>
              <p>
                {addr.neighborhood} - {addr.city}/{addr.state}
              </p>
              <p>CEP: {addr.zipCode}</p>
            </div>
            <button
              onClick={() => {
                setEditingAddress(addr);
                setModalOpen(true);
              }}
              className="text-blue-600 hover:underline"
            >
              Editar
            </button>
          </div>
        ))}
      </div>

      <AddressFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSave}
        initialData={editingAddress}
      />
    </div>
  );
}
