"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect } from "react";
import { User, ShoppingBag, Wallet, MapPinHouse, LogOutIcon } from "lucide-react";

function Card({ children, Icon }: any) {
    return (
        <Link href="#">
            <div className="bg-white shadow-sm text-gray-600 rounded-sm p-6 grid grid-cols-[auto_4fr] gap-4 justify-center items-center font-bold w-full h-40">
                <Icon className="text-amber-600" size={50} />
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
    }, [user, loading, router]);

    if (loading) return null;
    if (!loading && !user) return null;

    return (
        <div className="bg-amber-500 flex justify-center items-center w-auto h-screen">
            <div className="bg-gray-100 flex flex-col justify-around items-center gap-10 p-5 rounded-sm shadow-sm w-5xl">
                <div className="text-2xl font-bold flex items-center gap-2">
                    <User className="text-amber-600" size={50} />
                    <h1 className="text-gray-600">Olá, {user?.name}!</h1>
                </div>
                <div className="grid grid-cols-2 gap-2 w-full">
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
                        <h3 className="font-medium">
                            Gerencie seus cartões, créditos e resgate gift card.
                        </h3>
                    </Card>
                    <Card Icon={MapPinHouse}>
                        <h2>MEUS ENDEREÇOS</h2>
                        <h3 className="font-medium">
                            Altere seus endereços ou cadastre um novo endereço.
                        </h3>
                    </Card>
                </div>
                <button
                    onClick={logout}
                    className="bg-amber-600 flex justify-center items-center gap-4 text-white p-4 rounded-lg text-xl cursor-pointer"
                >
                    Sair
                    <LogOutIcon size={24} className="ml-2" />
                </button>
            </div>
        </div>
    );
}
