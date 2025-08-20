// import api from "@/lib/axios";
import { api } from "@/lib/api";
import { NextResponse } from "next/server";
import { setCookiesFromResponse } from "@/lib/utils/cookies";
import { SignInFormData } from "@/types";

export async function POST(request: Request) {
  try {
    const credentials: SignInFormData = await request.json();
    const response = await api.post("/auth/sign-in", credentials);

    await setCookiesFromResponse(response);

    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 401 });
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }
}
