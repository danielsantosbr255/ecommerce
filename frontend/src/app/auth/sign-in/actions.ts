"use server";

import { z } from "zod";
import api from "@/lib/axios";
import { redirect } from "next/navigation";
import { setCookiesFromResponse } from "@/lib/cookies";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const signIn = async (prevState: unknown, formData: FormData) => {
  console.log("🚀 [ACTIONS] - Dados anteriores: ", prevState);

  const result = schema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  let isAuthenticated = false;

  try {
    const res = await api.post("/auth/sign-in", result.data);
    await setCookiesFromResponse(res);
    isAuthenticated = true;
  } catch (error) {
    console.error("⛔ [SIGN IN] - Erro ao enviar dados para o servidor: ", error);
    return { error: "Erro ao fazer login. Verifique suas credenciais." };
  }

  if (!isAuthenticated) {
    return { error: "Erro ao fazer login. Verifique suas credenciais." };
  }

  redirect("/account");
};
