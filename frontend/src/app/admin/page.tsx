import React from "react";
import { User, ShoppingBag, Wallet } from "lucide-react";
import Link from "next/link";

function Card({ children, Icon, href = "#" }: any) {
    return (
        <Link href={href}>
            <div className="bg-white shadow-sm text-gray-600 rounded-sm p-6 grid grid-cols-[auto_4fr] gap-4 justify-center items-center font-bold w-full h-40">
                <Icon className="text-amber-500" size={50} />
                <div>{children}</div>
            </div>
        </Link>
    );
}

export default function Admin() {
    return (
        <div className="bg-gray-200 flex justify-center items-center w-auto h-screen p-4 mt-18">
            <div className="bg-gray-50 flex flex-col justify-around items-center gap-10 p-5 rounded-sm shadow-sm w-5xl">
                <div className="text-2xl font-bold flex items-center gap-2">
                    <User className="text-amber-500" size={50} />
                    <h1 className="text-gray-600">Painel Administrativo!</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                    <Card Icon={User}>
                        <h2>USUÁRIOS</h2>
                        <h3 className="font-medium">
                            Gerencie os usuários cadastrados, altere dados e exclua contas.
                        </h3>
                    </Card>
                    <Card Icon={ShoppingBag}>
                        <h2>PEDIDOS</h2>
                        <h3 className="font-medium">Gerencie os pedidos</h3>
                    </Card>
                    <Card Icon={Wallet} href="/admin/products">
                        <h2>PRODUTOS</h2>
                        <h3 className="font-medium">Gerencie seus produtos.</h3>
                    </Card>
                </div>
            </div>
        </div>
    );
}
