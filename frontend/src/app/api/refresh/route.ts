import api from "@/lib/axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { setCookiesFromResponse } from "@/lib/cookies";

export async function POST() {
  const cookiesStore = await cookies();
  const refreshToken = cookiesStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const response = await api.post("/auth/refresh");

  if (response.status !== 200) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  setCookiesFromResponse(response);

  return NextResponse.json(response.data);
}
