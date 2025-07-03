"use client";

import { use } from "react";
import { Session } from "@/types";
import { MdMonitor, MdSmartphone } from "react-icons/md";

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
          <div className="flex gap-4 items-center">
            {session.device === "Desktop" ? <MdMonitor size={40} /> : <MdSmartphone size={40} />}
            <span>
              <h2 className="text-lg font-semibold">
                {session.os} {session.ipAddress}
              </h2>
              <p>Localização: {session.location}</p>
              <p>
                Dispositivo: {session.browser} no {session.os}
              </p>
            </span>
          </div>

          <div className="flex flex-col">
            <span className="flex flex-col items-end">
              <p className="font-semibold">Primeiro Acesso:</p>
              <p className="underline">{new Date(session.createdAt).toLocaleString()}</p>
            </span>

            <span className="flex flex-col items-end">
              <p className="font-semibold">Último Acesso:</p>
              <p className="underline">{new Date(session.updatedAt).toLocaleString()}</p>
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
