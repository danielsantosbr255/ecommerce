const localhost: string = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

class UserUtil {
  async fetchUser(token: string) {
    const res = await fetch(`${localhost}/account`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    });
    // console.log(res, "USER DATA");
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Falha ao obter usuário");
    }
    const data = await res.json();
    return data.user;
  }

  async fetchUsers(token: string) {
    const res = await fetch(`${localhost}/users`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Falha ao obter usuários");
    }
    return await res.json();
  }

  async updateUser(token: string, name: string, email: string) {
    const res = await fetch(`${localhost}/account`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error("Falha ao atualizar usuário");
    return data.token;
  }

  async signUp(name: string, email: string, password: string) {
    const res = await fetch(`${localhost}/auth/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
      credentials: "include",
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Falha ao cadastrar-se");
    }
    return await res.json();
  }

  async signin(email: string, password: string) {
    const res = await fetch(`${localhost}/auth/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Falha ao efetuar o login");
    }
    return await res.json();
  }

  async refreshToken() {
    const res = await fetch(`${localhost}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Falha ao atualizar o token");
    }
    const data = await res.json();    
    return data.accessToken;
  }

  async logout() {
    const res = await fetch(`${localhost}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Falha ao efetuar o logout");
    }
    return await res.json();
  }
}

export default new UserUtil();
