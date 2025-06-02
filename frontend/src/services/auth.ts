import api from "@/lib/axios";
import { Session, SignInFormData, SignUpFormData } from "@/types";

class AuthService {
  public async signUp(credentials: SignUpFormData) {
    const res = await api.post("/auth/sign-up", credentials);
    return res.data as { session: Session };
  }

  public async signIn(credentials: SignInFormData) {
    const res = await api.post("/auth/sign-in", credentials);
    return res.data as { session: Session };
  }

  public async signOut() {
    return await api.post("/auth/sign-out");
  }
}

export const authService = new AuthService();
