"use client";

import { Address } from "@/types";
import Alert from "@/components/ui/Alert";
import { FaRegAddressBook } from "react-icons/fa";

export default function Addresses({ addresses }: { addresses: Address[] }) {
  if (!addresses || addresses.length === 0) {
    return (
      <div className="flex flex-col gap-4 p-6 bg-bg-secondary rounded-lg shadow-xs">
        <p className="text-tx-primary text-center font-semibold">Nenhum endereço encontrado.</p>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-2">
      {addresses.map((address) => (
        <article
          key={address.id}
          className="bg-bg-secondary grid grid-cols-5 justify-between items-center p-4 gap-1 shadow-xs rounded-lg"
        >
          <div className="flex flex-col text-lg justify-start gap-1">
            <span className="relative flex font-bold items-center gap-2">
              <FaRegAddressBook size={25} />
              <span className="absolute top-0.5 -left-1">{address.isDefault && <Alert />}</span>
              {address.label} {address.isDefault && "(Padrão)"}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <span className="font-bold">Vizinhança</span>
            {address.street}, {address.neighborhood} - {address.number} {address.complement}
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <span className="font-bold">Cidade</span>
            <span className="bg-primary/20 text-sm p-1 px-2 font-semibold rounded-full text-primary">
              {address.city}, {address.state} - {address.zipCode}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <span className="font-bold">Pais</span>
            <span>{address.country}</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <span className="font-bold">Data de criação</span>
            <span>{new Date(address.createdAt).toLocaleString()}</span>
          </div>
        </article>

        // <div
        //   key={address.id}
        //   className="bg-bg-secondary flex justify-between items-center shadow-xs p-4 border border-lines/20 rounded-lg text-tx-primary"
        // >
        //   <span>
        //     <h2 className="text-lg font-semibold">
        //       {address.label} {address.isDefault && " (Padrão)"}
        //     </h2>
        //     <p>
        //       {address.street}, {address.number}, {address.neighborhood} {address.complement && `, ${address.complement}`}
        //     </p>
        //     <p>
        //       {address.city}, {address.state} - {address.zipCode}
        //     </p>
        //     <p>{address.country}</p>
        //   </span>

        //   <span>
        //     <Button
        //       onClick={() => toast.info("Funcionalidade de editar endereço ainda não implementada.")}
        //       className="!bg-secondary px-4 py-2 rounded hover:bg-secondary/80 transition"
        //     >
        //       <FaPen className="inline-block mr-2" />
        //       Editar Endereço
        //     </Button>
        //   </span>
        // </div>
      ))}
    </section>
  );
}
