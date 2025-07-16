"use client";

import { Address } from "@/types";
import { FaPencil } from "react-icons/fa6";
import { FaRegAddressCard } from "react-icons/fa";

export default function Addresses({ addresses }: { addresses: Address[] }) {
  if (!addresses || addresses.length === 0) {
    return (
      <div className="flex flex-col gap-4 p-6 bg-bg-secondary rounded-lg shadow-xs">
        <p className="text-tx-primary text-center font-semibold">Nenhum endereço encontrado.</p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {addresses.map((address) => (
        <article key={address.id} className="bg-bg-secondary flex flex-col gap-4 p-5 rounded-lg shadow">
          <div className="flex text-primary gap-2 font-semibold text-lg items-center">
            <FaRegAddressCard size={25} />
            {address.label} {address.isDefault ? "(Padrão)" : ""}
          </div>

          <div className="flex flex-col gap-1">
            <p>
              <strong>Rua:</strong> {address.street}
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

          <div className="flex text-primary w-full justify-end items-center gap-1">
            <FaPencil />
            <span className="cursor-pointer hover:underline">Editar</span>
          </div>
        </article>
      ))}
    </section>
  );
}
