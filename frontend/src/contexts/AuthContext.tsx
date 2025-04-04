"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    accessToken: string | null;
    signUp: (name: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState(null);
    const router = useRouter();

    // Função para buscar usuário
    const fetchUser = useCallback(async (token: string) => {
        try {
            const res = await fetch("http://localhost:3001/account", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();

            if (!res.ok) throw new Error("Falha ao obter usuário");

            setUser(data.user);
        } catch (err) {
            setUser(null);
            setAccessToken(null);
        } finally {
            setLoading(false);
        }
    }, []);

    // SignUP
    const signUp = async (name: string, email: string, password: string) => {
        try {
            const response = await fetch("http://localhost:3001/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok) setAccessToken(data.token);
            else setError(data.message);

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
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok) setAccessToken(data.token);
            else setError(data.message);

            fetchUser(data.token);
            router.push("/account");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido");
        }
    };

    const refreshToken = async () => {
        const res = await fetch("http://localhost:3001/auth/refresh", {
            method: "POST",
            credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
            setAccessToken(data.token);
            fetchUser(data.token);
        } else {
            setUser(null);
            setAccessToken(null);
        }
    };

    // Logout
    const logout = async () => {
        const res = await fetch("http://localhost:3001/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        setUser(null);
        setAccessToken(null);
        router.push("/auth/signin");
    };

    useEffect(() => {
        refreshToken();
        const interval = setInterval(refreshToken, 14 * 60 * 1000); // Refresh antes de expirar
        return () => clearInterval(interval);
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, error, accessToken, signUp, login, logout }}>
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
