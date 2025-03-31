"use client";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "../search/SearchBar";
import {
    Menu,
    ShoppingCart,
    LogIn,
    Bell,
    UserPlus,
    User,
    FlameKindling,
    UserCircle,
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
        <nav className="fixed top-0 w-full flex items-center py-2 px-8 justify-between z-50 bg-neutral-800 text-gray-300">
            <Link href="/" className="font-bold text-xl h-12 flex items-center text-amber-500">
                <FlameKindling className="size-10" />
                Fireforge Labs
            </Link>

            {/* Campo de pesquisa */}
            <div className="hidden md:block">
                <SearchBar onSearch={handleSearch} />
            </div>

            <div className="hidden gap-8 md:flex">
                <Link className="" href="#">
                    <ShoppingCart />
                </Link>
                <Link className="" href="#">
                    <Bell />
                </Link>
                <Link href={user ? "/account" : "/auth/signin"}>
                    {user ? <UserCircle className="h-6 w-6" /> : <LogIn />}
                </Link>
            </div>

            <button className="md:hidden">
                <Menu className="h-6 w-6" />
            </button>
        </nav>
    );
}
