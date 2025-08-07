import { Suspense } from "react";
import { sessionService } from "@/services/sessions";
import Sessions from "@/components/layout/Sessions";

async function page() {
  const sessions = await sessionService.getAll();

  if (!sessions || sessions.length === 0) {
    return (
      <div className="flex flex-col gap-4 p-6 bg-bg-secondary rounded-lg shadow-xs">
        <p className="text-tx-primary text-center font-semibold">Nenhuma sessão ativa encontrada.</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col w-full gap-4">
      <Suspense fallback={<div className="text-tx-primary">Carregando...</div>}>
        <Sessions sessions={sessions} />
      </Suspense>
    </main>
  );
}

export default page;
