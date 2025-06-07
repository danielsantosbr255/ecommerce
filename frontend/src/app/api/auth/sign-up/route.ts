import api from "@/lib/axios";
import { SignUpFormData } from "@/types";
import { NextResponse } from "next/server";
import { setCookiesFromResponse } from "@/lib/cookies";

export async function POST(request: Request) {
  try {
    const credentials: SignUpFormData = await request.json();

    const response = await api.post("/auth/sign-up", credentials);

    setCookiesFromResponse(response);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
}
