import { Session } from "@/types";
import Alert from "@/components/ui/Alert";

import Link from "next/link";
import { MdImportantDevices, MdMonitor, MdSmartphone } from "react-icons/md";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Sessions({ sessions }: { sessions: Session[] | null }) {
  if (!sessions || sessions.length === 0) {
    return <p>Nenhuma sessão ativa encontrada.</p>;
  }

  return (
    <Table>
      <TableCaption className="text-center py-4">
        <div className="relative flex justify-center items-center gap-3 text-tx-primary font-semibold text-xl">
          <MdImportantDevices className="text-primary" size={25} />
          <p>Sessões</p>

          <span className="absolute top-0 right-3 bg-primary/20 text-primary font-normal text-sm px-2 py-1 rounded-xl">
            {sessions.length > 0 ? `${sessions.length} sessões` : "Nenhum sessão"}
          </span>
        </div>
      </TableCaption>

      <TableHeader>
        <TableRow className="bg-bg-overlay/10 text-sm">
          <TableHead className="text-center">IP</TableHead>
          <TableHead>Localização</TableHead>
          <TableHead className="text-center">Dispositivo</TableHead>
          <TableHead className="text-center">Primeiro Acesso</TableHead>
          <TableHead className="text-center">Ultimo Acesso</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="bg-bg-secondary divide-lines">
        {sessions.map((session) => (
          <TableRow key={session.id}>
            <TableCell className="">
              <div className="flex flex-col items-center justify-center">
                <span className="relative flex items-center">
                  {session.device === "Desktop" ? <MdMonitor size={40} /> : <MdSmartphone size={40} />}
                  <span className="absolute -top-0 right-0 scale-150">{session.isActive && <Alert />}</span>
                </span>
                <span className="text-sm text-center font-semibold">
                  <p>{session.os}</p>
                  <p>{session.ipAddress}</p>
                </span>
              </div>
            </TableCell>

            <TableCell>
              <span className="flex items-center gap-2">{session.location}</span>
            </TableCell>

            <TableCell className="text-center">
              <span className="bg-primary/20 text-sm py-2 px-3 font-medium rounded-full text-primary">
                {session.browser} no {session.os}
              </span>
            </TableCell>

            <TableCell className="text-right">{new Date(session.createdAt).toLocaleString()}</TableCell>
            <TableCell className="text-right">{new Date(session.updatedAt).toLocaleString()}</TableCell>

            <TableCell className="text-right">
              {/* <Link href={`/admin/sessions/${session.id}`} className="text-primary hover:underline"> */}
              <Link href="#" className="text-primary hover:underline">
                Ver Detalhes
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
