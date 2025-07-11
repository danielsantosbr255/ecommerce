import Sessions from "@/components/layout/Sessions";
import { FaWindowClose } from "react-icons/fa";

function page() {
  return (
    <main className="w-full">
      <h1 className="flex w-full border-b border-lines p-2 items-center gap-3 my-2 text-lg font-bold text-tx-primary">
        <FaWindowClose className="text-primary inline-block" size={24} />
        Sessões de Usuários
      </h1>
      <Sessions />
    </main>
  );
}

export default page;
