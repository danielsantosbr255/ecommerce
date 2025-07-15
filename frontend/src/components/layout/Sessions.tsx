import { Session } from "@/types";
import Alert from "@/components/ui/Alert";
import { MdMonitor, MdSmartphone } from "react-icons/md";

export default function Sessions({ sessions }: { sessions: Session[] | null }) {
  if (!sessions || sessions.length === 0) {
    return <p>Nenhuma sessão ativa encontrada.</p>;
  }

  return (
    <section className="space-y-2">
      {sessions.map((session) => (
        <article key={session.id} className="bg-bg-secondary flex justify-between items-center p-4 shadow-xs rounded-lg">
          <div className="flex flex-col items-center justify-center gap-1">
            <h2 className="relative flex text-lg font-semibold items-center gap-2">
              {session.device === "Desktop" ? <MdMonitor size={40} /> : <MdSmartphone size={40} />}
              <span className="absolute -top-0 right-0 scale-150">{session.isActive && <Alert />}</span>
            </h2>
            {session.os} {session.ipAddress}
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <span className="font-bold">Localização</span>
            {session.location}
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <span className="font-bold">Dispositivo</span>
            <span className="bg-primary/20 text-sm p-1 px-2 font-semibold rounded-full text-primary">
              {session.browser} no {session.os}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <span className="font-bold">Primeiro Acesso</span>
            <span>{new Date(session.createdAt).toLocaleString()}</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <span className="font-bold">Último Acesso</span>
            <span>{new Date(session.updatedAt).toLocaleString()}</span>
          </div>
        </article>
      ))}
    </section>
  );
}
