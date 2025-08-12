import Profile from "@/app/(root)/account/_components/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minha Conta - Fireforge Labs",
  description: "Aqui você  pode atualizar suas informações de conta e segurança.",
};

export default function MyAccount() {
  return (
    <div className="flex flex-col w-full flex-1 p-4 md:px-4 md:max-w-10/12 mx-auto">
      <Profile />
    </div>
  );
}
