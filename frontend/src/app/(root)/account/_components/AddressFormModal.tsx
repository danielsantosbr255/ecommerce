"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";
import { AddressResponse } from "@/types";
import Input from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { Modal } from "@/components/ui/Modal";
import Checkbox from "@/components/ui/Checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { addressSchema, Address } from "@/lib/schemas/address.schema";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Address) => void;
  initialData?: AddressResponse;
}

export function AddressFormModal({ isOpen, onClose, onSubmit, initialData }: AddressModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Address>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      label: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      isDefault: false,
    },
  });

  useEffect(() => {
    if (initialData) reset(initialData);
    else reset();
  }, [initialData, reset]);

  const cep = watch("zipCode");

  useEffect(() => {
    const fetchAddress = async () => {
      const cleanCep = cep.replace(/\D/g, "");
      if (cleanCep.length === 8) {
        try {
          const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
          const data = await res.json();
          if (!data.erro) {
            setValue("street", data.logradouro);
            setValue("neighborhood", data.bairro);
            setValue("city", data.localidade);
            setValue("state", data.uf);
            setValue("country", "Brasil");
          }
        } catch {
          toast.error("Erro ao buscar CEP");
        }
      }
    };
    fetchAddress();
  }, [cep, setValue]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Editar Endereço" : "Cadastrar Endereço"}>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          onClose();
        })}
        className="space-y-6"
      >
        <div>
          <Input id="label" {...register("label")} label="Nome" />
          <ErrorMessage message={errors.label?.message} />
        </div>

        <div>
          <Input id="zipCode" {...register("zipCode")} placeholder="00000-000" label="CEP" />
          <ErrorMessage message={errors.zipCode?.message} />
        </div>

        <div>
          <Input id="street" {...register("street")} label="Rua" />
          <ErrorMessage message={errors.street?.message} />
        </div>

        <div>
          <Input id="number" {...register("number")} label="Número" />
          <ErrorMessage message={errors.number?.message} />
        </div>

        <div>
          <Input id="neighborhood" {...register("neighborhood")} placeholder="Ex: Centro" label="Bairro" />
          <ErrorMessage message={errors.neighborhood?.message} />
        </div>

        <div>
          <Input id="complement" {...register("complement")} label="Complemento" />
          <ErrorMessage message={errors.complement?.message} />
        </div>

        <div>
          <Input id="city" {...register("city")} label="Cidade" />
          <ErrorMessage message={errors.city?.message} />
        </div>

        <div>
          <Input id="state" {...register("state")} label="Estado" />
          <ErrorMessage message={errors.state?.message} />
        </div>

        <div>
          <Input id="country" {...register("country")} label="País" />
          <ErrorMessage message={errors.country?.message} />
        </div>

        <div>
          <Checkbox {...register("isDefault")} checked={watch("isDefault")} label="Endereço Padrão" checkSize={15} />
          <ErrorMessage message={errors.isDefault?.message} />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
