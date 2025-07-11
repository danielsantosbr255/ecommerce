import React, { Suspense } from "react";
import Sessions from "../_components/Sessions";
import { FaWindowClose } from "react-icons/fa";

function page() {
  return (
    <main className="flex flex-col w-full h-full p-4 md:max-w-10/12 mx-auto">
      <h1 className="flex w-full border-b border-lines p-4 items-center gap-3 my-2 text-lg font-bold text-tx-primary">
        <FaWindowClose className="text-primary inline-block" size={24} />
        Minhas Sessões
      </h1>

      <Suspense fallback={<div className="text-tx-primary">Carregando...</div>}>
        <Sessions />
      </Suspense>
    </main>
  );
}

export default page;
