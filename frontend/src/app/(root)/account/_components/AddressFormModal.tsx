"use client";

import { useEffect } from "react";
import { AddressResponse } from "@/types";
import Input from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import Checkbox from "@/components/ui/Checkbox";
import { useCepLookup } from "@/hooks/useCepLookup";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { addressSchema, Address } from "@/lib/schemas/address.schema";
import { useMemo } from "react";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Address) => void;
  initialData?: AddressResponse;
  isSubmitting?: boolean;
}

export function AddressFormModal({ isOpen, onClose, onSubmit, initialData, isSubmitting = false }: AddressModalProps) {
  const emptyValues: Address = useMemo(
    () => ({
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
    }),
    []
  );

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<Address>({
    resolver: zodResolver(addressSchema),
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (isOpen) reset(initialData || emptyValues);
  }, [isOpen, initialData, reset, emptyValues]);

  const cep = watch("zipCode");
  useCepLookup(cep, setValue);

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={initialData ? "Editar Endereço" : "Cadastrar Endereço"}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          <Checkbox id="isDefault" {...register("isDefault")} label="Endereço Padrão" checkSize={15} />
          <ErrorMessage message={errors.isDefault?.message} />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
