import { api } from "@/lib/api";
import { SignUpFormData } from "@/types";
import { NextResponse } from "next/server";
import { setCookiesFromResponse } from "@/lib/cookies";

export async function POST(request: Request) {
  try {
    const credentials: SignUpFormData = await request.json();
    const response = await api.post("/auth/sign-up", credentials);

    await setCookiesFromResponse(response);

    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 401 });
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }
}
