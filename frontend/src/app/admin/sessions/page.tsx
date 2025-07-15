import Sessions from "@/components/layout/Sessions";
import SessionLabel from "@/components/ui/SessionLabel";
import { sessionService } from "@/services/sessions";
import { FaWindowClose } from "react-icons/fa";

async function page() {
  const sessions = await sessionService.getAll();

  return (
    <main className="flex flex-col w-full gap-4">
      <SessionLabel label="Sessões de Usuários" icon={<FaWindowClose size={25} />} />
      <Sessions sessions={sessions} />
    </main>
  );
}

export default page;
