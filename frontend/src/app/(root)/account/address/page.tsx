import React, { Suspense } from "react";
import Address from "../_components/Address";
import { FaAddressBook } from "react-icons/fa";
import { addressService } from "@/services/address";

function page() {
  const addressesPromise = addressService.getAll();

  return (
    <main className="flex flex-col w-full h-full p-4 md:max-w-10/12 mx-auto">
      <h1 className="flex w-full border-b border-lines p-4 items-center gap-3 my-2 text-lg font-bold text-tx-primary">
        <FaAddressBook className="text-primary inline-block" size={24} />
        Meus endereços
      </h1>

      <Suspense fallback={<div className="text-tx-primary">Carregando...</div>}>
        <Address addressesPromise={addressesPromise} />
      </Suspense>
    </main>
  );
}

export default page;
