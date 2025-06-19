import api from "@/lib/axios";
import { NextResponse } from "next/server";
import { setCookiesFromResponse } from "@/lib/cookies";
import { SignInFormData } from "@/types";

export async function POST(request: Request) {
  try {
    const credentials: SignInFormData = await request.json();

    const response = await api.post("/auth/sign-in", credentials);

    setCookiesFromResponse(response);

    return NextResponse.json(response.data);
  } catch {
    return NextResponse.json({ message: "Credenciais inválidas" });
  }
}
