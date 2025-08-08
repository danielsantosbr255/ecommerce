import { Suspense } from "react";
import Sessions from "@/components/layout/Sessions";
import { sessionService } from "@/services/sessions";

async function page() {
  const sessions = await sessionService.getAll();

  return (
    <main className="flex flex-col w-full h-full p-4 pt-10 gap-4 md:max-w-10/12 mx-auto">
      <Suspense fallback={<div className="text-center">Carregando...</div>}>
        <Sessions sessions={sessions} />
      </Suspense>
    </main>
  );
}

export default page;
