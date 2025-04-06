"use client";

import apiManager from "@/utils/apiManager";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
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
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const router = useRouter();

    const fetchUser = async (token: string) => {
        const user = await apiManager.user.fetchUser(token);
        setUser(user);
        setAccessToken(token);
        setLoading(false);
    };

    const signUp = async (name: string, email: string, password: string) => {
        setError(null);
        const { token } = await apiManager.user.signUp(name, email, password);
        if (!token) return setError("Falha ao cadastrar-se");

        fetchUser(token);
        router.push("/account");
    };

    const login = async (email: string, password: string) => {
        setError(null);
        const { token } = await apiManager.user.signin(email, password);
        if (!token) return setError("Falha ao efetuar o login");

        await fetchUser(token);
        router.push("/account");
    };

    const refreshToken = async () => {
        const token = await apiManager.user.refreshToken();
        if (token) return await fetchUser(token);

        setUser(null);
        setLoading(false);
        setAccessToken(null);
        setError("Falha ao atualizar o token");
    };

    const logout = async () => {
        apiManager.user.logout();
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
