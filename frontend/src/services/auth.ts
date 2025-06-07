import api from "@/lib/axios";
import { Session, SignInFormData, SignUpFormData } from "@/types";

class AuthService {
  public async signUp(credentials: SignUpFormData) {
    const res = await api.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-up`, credentials);
    return res.data as { session: Session };
  }

  public async signIn(credentials: SignInFormData) {
    const res = await api.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-in`, credentials);
    return res.data as { session: Session };
  }

  public async signOut() {
    return await api.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-out`);
  }
}

export const authService = new AuthService();
