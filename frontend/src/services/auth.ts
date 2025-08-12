import { api } from "@/lib/api";
import { Session, SignInFormData, SignUpFormData } from "@/types";

class AuthService {
  public async signUp(credentials: SignUpFormData) {
    const res = await api.post<{ session: Session }>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-up`, credentials);
    return res.data;
  }

  public async signIn(credentials: SignInFormData) {
    const res = await api.post<{ session: Session }>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-in`, credentials);
    return res.data;
  }

  public async signOut() {
    return await api.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-out`);
  }

  public async getSessions() {
    const res = await api.get("/sessions", { _auth: true });
    return res.data as Session[];
  }
}

export const authService = new AuthService();
