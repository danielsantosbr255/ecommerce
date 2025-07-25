// import React, { Suspense } from "react";
// import Address from "../_components/Address";
// import { FaAddressBook } from "react-icons/fa";
// import { addressService } from "@/services/address";
// import SessionLabel from "@/components/ui/SessionLabel";
import AddressesComponent from "./Addresses";

async function AddressPage() {
  // const addresses = await addressService.getAll();

  return (
    <main className="flex flex-col w-full h-full p-6 gap-4 md:max-w-10/12 mx-auto">
      <AddressesComponent />
    </main>
  );
}

export default AddressPage;
