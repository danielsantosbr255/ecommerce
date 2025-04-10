const localhost: string = "http://localhost:3001";

class UserUtil {
    async fetchUser(token: string) {
        const res = await fetch(`${localhost}/account`, {
            headers: { Authorization: `Bearer ${token}` },
            credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) throw new Error("Falha ao obter usuário");
        return data.user;
    }

    async fetchUsers(token: string) {
        const res = await fetch(`${localhost}/users`, {
            headers: { Authorization: `Bearer ${token}` },
            credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error("Falha ao obter usuários");
        return data;
    }

    async updateUser(token: string, name: string, email: string) {
        const response = await fetch(`${localhost}/account`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email }),
            credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) throw new Error("Falha ao atualizar usuário");
        return data.token;
    }

    async signUp(name: string, email: string, password: string) {
        const response = await fetch(`${localhost}/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
            credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) return null;
        return data;
    }

    async signin(email: string, password: string) {
        const response = await fetch(`${localhost}/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include",
        });
        const data = await response.json();

        if (!response.ok) return null;
        return data;
    }

    async refreshToken() {
        try {
            const res = await fetch(`${localhost}/auth/refresh`, {
                method: "POST",
                credentials: "include",
            });
            const data = await res.json();

            if (!res.ok) return null;
            return data.accessToken;
        } catch (error) {
            console.error("Erro ao atualizar o token:", error);
            return null;
        }
    }

    async logout() {
        const res = await fetch(`${localhost}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        if (!res.ok) throw new Error("Falha ao fazer logout");
    }
}

const user = new UserUtil();

export default user;
