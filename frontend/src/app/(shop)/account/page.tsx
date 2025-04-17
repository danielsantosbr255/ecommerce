"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect } from "react";
import { User, ShoppingBag, Wallet, MapPinHouse, LogOutIcon, LucideProps } from "lucide-react";

function Card({
  children,
  Icon,
}: {
  children: React.ReactNode;
  Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}) {
  return (
    <Link href="#">
      <div className="bg-white shadow-sm text-gray-600 rounded-lg p-6 grid grid-cols-[auto_4fr] gap-4 justify-center items-center font-bold w-full h-40">
        <Icon className="text-highlight-n" size={50} />
        <div>{children}</div>
      </div>
    </Link>
  );
}

export default function Profile() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) logout();
  }, [user, loading, router, logout]);

  if (!loading && !user) return null;

  return (
    <div className="flex justify-center items-center p-4">
      <div className="bg-gray-50 flex flex-col mt-10 border border-gray-400/10 justify-center items-center gap-10 p-5 rounded-lg shadow-sm max-w-5xl">
        <div className="text-2xl font-bold flex items-center gap-2">
          <User className="text-highlight-n" size={50} />
          <h1 className="text-gray-600">Olá, {user?.name}!</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
          <Card Icon={User}>
            <h2>MEUS DADOS</h2>
            <h3 className="font-medium">
              Altere seus dados cadastrados, endereços ou cadastre um novo endereço.
            </h3>
          </Card>
          <Card Icon={ShoppingBag}>
            <h2>MEUS PEDIDOS</h2>
            <h3 className="font-medium">Veja históricos e acompanhe suas compras</h3>
          </Card>
          <Card Icon={Wallet}>
            <h2>CARTEIRA</h2>
            <h3 className="font-medium">Gerencie seus cartões, créditos e resgate gift card.</h3>
          </Card>
          <Card Icon={MapPinHouse}>
            <h2>MEUS ENDEREÇOS</h2>
            <h3 className="font-medium">Altere seus endereços ou cadastre um novo endereço.</h3>
          </Card>
        </div>
        <button
          onClick={logout}
          className="bg-highlight-n shadow-sm flex justify-center items-center gap-2 text-white p-4 rounded-lg text-xl cursor-pointer"
        >
          Sair
          <LogOutIcon size={24} className="ml-2" />
        </button>
      </div>
    </div>
  );
}
