"use client";

import { use } from "react";
import { Session } from "@/types";

export default function Sessions({ sessionsPromise }: { sessionsPromise: Promise<Session[]> }) {
  const sessions = use(sessionsPromise);

  if (!sessions || sessions.length === 0) {
    return <p>Nenhuma sessão ativa encontrada.</p>;
  }

  return (
    <section className="space-y-2">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="bg-bg-secondary flex justify-between items-center shadow-xs p-4 border border-lines/20 rounded-lg text-tx-primary"
        >
          <span>
            <h2 className="text-lg font-semibold">Sessão Ativa</h2>
            <p>Dispositivo: {session.userAgent}</p>
            <p>Localização: {session.ipAddress}</p>
            <p>Início: {new Date(session.createdAt).toLocaleString()}</p>
          </span>
        </div>
      ))}
    </section>
  );
}
