"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";
import { UseFormSetValue } from "react-hook-form";
import { Address } from "@/lib/schemas/address.schema";

export function useCepLookup(cep: string, setValue: UseFormSetValue<Address>) {
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
    const timeout = setTimeout(fetchAddress, 500);
    return () => clearTimeout(timeout);
  }, [cep, setValue]);
}
