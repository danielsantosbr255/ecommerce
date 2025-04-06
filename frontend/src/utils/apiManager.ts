const localhost: string = "http://localhost:3001";

class User {
    async fetchUser(token: string) {
        const res = await fetch(`${localhost}/account`, {
            headers: { Authorization: `Bearer ${token}` },
            credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) throw new Error("Falha ao obter usuário");
        return data.user;
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
        const res = await fetch(`${localhost}/auth/refresh`, {
            method: "POST",
            credentials: "include",
        });
        const data = await res.json();
        
        if (!res.ok) return null;
        return data.token;
    }

    async logout() {
        const res = await fetch(`${localhost}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        if (!res.ok) throw new Error("Falha ao fazer logout");
    }
}

class Products {
    async fetchProducts() {
        const res = await fetch(`${localhost}/products`);
        const data = await res.json();
        if (!res.ok) throw new Error("Falha ao obter produtos");
        return data.products;
    }
}

const user = new User();
const products = new Products();

export default { user, products };
