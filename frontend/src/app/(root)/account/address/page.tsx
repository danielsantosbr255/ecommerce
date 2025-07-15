import React, { Suspense } from "react";
import Address from "../_components/Address";
import { FaAddressBook } from "react-icons/fa";
import { addressService } from "@/services/address";
import SessionLabel from "@/components/ui/SessionLabel";

async function page() {
  const addresses = await addressService.getAll();

  return (
    <main className="flex flex-col w-full h-full p-6 gap-4 md:max-w-10/12 mx-auto">
      <SessionLabel label="Meus Endereços" icon={<FaAddressBook size={25} />} />

      <Suspense fallback={<div className="text-tx-primary">Carregando...</div>}>
        <Address addresses={addresses} />
      </Suspense>
    </main>
  );
}

export default page;
