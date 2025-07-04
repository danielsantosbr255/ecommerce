"use client";

import { use } from "react";
import { Address } from "@/types";
import { toast } from "react-toastify";
import { FaPen } from "react-icons/fa";
import Button from "@/components/ui/Button";

export default function Addresses({ addressesPromise }: { addressesPromise: Promise<Address[]> }) {
  const addresses = use(addressesPromise);

  if (!addresses || addresses.length === 0) {
    return <p>Nenhum endereço encontrado.</p>;
  }

  return (
    <section className="space-y-4">
      <div>
        {addresses.map((address) => (
          <div
            key={address.id}
            className="bg-bg-secondary flex justify-between items-center shadow-xs p-4 border border-lines/20 rounded-lg text-tx-primary"
          >
            <span>
              <h2 className="text-lg font-semibold">{address.label} {address.isDefault && " (Padrão)"}</h2>
              <p>
                {address.street}, {address.number}, {address.neighborhood} {address.complement && `, ${address.complement}`}
              </p>
              <p>
                {address.city}, {address.state} - {address.zipCode}
              </p>
              <p>{address.country}</p>
            </span>

            <span>
              <Button
                onClick={() => toast.info("Funcionalidade de editar endereço ainda não implementada.")}
                className="!bg-secondary px-4 py-2 rounded hover:bg-secondary/80 transition"
              >
                <FaPen className="inline-block mr-2" />
                Editar Endereço
              </Button>
            </span>
          </div>
        ))}
      </div>

      <Button onClick={() => toast.info("Funcionalidade de adicionar endereço ainda não implementada.")}>
        Adicionar Endereço
      </Button>
    </section>
  );
}
