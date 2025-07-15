import React, { Suspense } from "react";
import Sessions from "@/components/layout/Sessions";
import { sessionService } from "@/services/sessions";
import { FaWindowClose } from "react-icons/fa";
import SessionLabel from "@/components/ui/SessionLabel";

async function page() {
  const sessions = await sessionService.getAll();

  return (
    <main className="flex flex-col w-full h-full p-4 gap-4 md:max-w-10/12 mx-auto">
      <SessionLabel label="Minhas Sessões" icon={<FaWindowClose size={25} />} />

      <Suspense fallback={<div className="text-tx-primary">Carregando...</div>}>
        <Sessions sessions={sessions} />
      </Suspense>
    </main>
  );
}

export default page;
