import { FaShieldAlt } from "react-icons/fa";
import AccessAndSecurity from "../_components/Security";
import SessionLabel from "@/components/ui/SessionLabel";

function SecurityPage() {
  return (
    <main className="flex flex-col w-full flex-1 p-4 gap-4 md:px-4 md:max-w-10/12 mx-auto">
      <SessionLabel label="Acesso e Segurança" icon={<FaShieldAlt size={25} />} />
      <AccessAndSecurity />
    </main>
  );
}

export default SecurityPage;
