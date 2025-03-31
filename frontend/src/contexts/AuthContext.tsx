"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    signUp: (name: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Função para buscar usuário
    const fetchUser = useCallback(async (token: string) => {
        try {
            const res = await fetch("http://localhost:3001/account", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error("Falha ao obter usuário");

            const data = await res.json();
            setUser(data.user);
        } catch (err) {
            logout();
        } finally {
            setLoading(false);
        }
    }, []);

    // Verifica token no carregamento
    useEffect(() => {
        const token = Cookies.get("token");
        if (token) fetchUser(token);
        else setLoading(false);
    }, [fetchUser]);

    // SignUP
    const signUp = async (name: string, email: string, password: string) => {
        try {
            const response = await fetch("http://localhost:3001/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) return setError(data.message);

            Cookies.set("token", data.token, { expires: 1 });

            fetchUser(data.token);
            router.push("/account");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Erro desconhecido");
            alert("Falha ao efetuar cadastro");
        }
    };

    // Login
    const login = async (email: string, password: string) => {
        try {
            const response = await fetch("http://localhost:3001/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) setError(data.message);

            Cookies.set("token", data.token, { expires: 1 });

            fetchUser(data.token);
            router.push("/account");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido");
        }
    };

    // Logout
    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        router.push("/auth/signin");
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, signUp, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook para usar o contexto
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider.");
    }
    return context;
}
