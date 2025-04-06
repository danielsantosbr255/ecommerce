"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import React from "react";

export default function Auth() {
    const { user } = useAuth();
    const router = useRouter();

    // Verifica se o usuário está autenticado
    if (user) {
        return <h1>Bem-vindo, {user.name}!</h1>;
    } else {
        router.push("auth/signin");
        return null;
    }

    return null;
}
