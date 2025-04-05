"use client";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "../search/SearchBar";
import {
    Menu,
    ShoppingCart,
    LogIn,
    Bell,
    FlameKindling,
    UserCircle,
    Loader2,
    ShieldUser,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState("");

    const auth = useAuth();
    if (!auth) return;

    const { user, loading } = auth;

    const handleSearch = (query: any) => {
        setSearchQuery(query);
        console.log("Buscando por:", query); // Aqui você pode conectar a um sistema de busca
    };

    return (
        <nav className="fixed bg-white w-full top-0 z-50 shadow-md">
            <div className="flex mx-auto lg:max-w-10/12 py-3 px-2 items-center justify-between z-50 text-gray-500">
                <div className="hidden md:flex gap-6 items-center font-semibold text-sm">
                    <Link
                        href="/"
                        className="font-bold text-sm h-12 flex items-center text-amber-500 mr-5 focus:outline-none"
                    >
                        <FlameKindling className="size-8" />
                        Fireforge Labs
                    </Link>
                    <Link className="" href="/">
                        Início
                    </Link>
                    <Link className="" href="/">
                        Loja
                    </Link>
                    <Link className="" href="/">
                        Sobre
                    </Link>
                    <Link className="" href="/">
                        Contato
                    </Link>
                </div>

                {/* Campo de pesquisa */}
                <div className="hidden gap-8 md:flex items-center">
                    <SearchBar onSearch={handleSearch} />

                    <Link className="text-yellow-400 animate-pulse" href="/admin">
                        {user?.role === "ADMIN" && <ShieldUser className="scale-120" />}
                    </Link>
                    <Link href={user ? "/account" : "/auth/signin"}>
                        {!loading ? (
                            user ? (
                                <UserCircle className="h-6 w-6" />
                            ) : (
                                <LogIn />
                            )
                        ) : (
                            <Loader2 className="animate-spin h-6 w-6" />
                        )}
                    </Link>
                    <Link className="" href="#">
                        <Bell />
                    </Link>
                    <Link className="" href="#">
                        <ShoppingCart />
                    </Link>
                </div>

                <button className="md:hidden">
                    <Menu className="h-6 w-6" />
                </button>
            </div>
        </nav>
    );
}
