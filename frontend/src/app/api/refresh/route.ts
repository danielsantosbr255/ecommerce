import api from "@/lib/axios";
import { setCookiesFromResponse } from "@/lib/cookies";
// import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  // const cookiesStore = await cookies();

  const response = await api.post("/auth/refresh");

  if (response.status !== 200) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  // const { accessToken, refreshToken } = response.data.session;

  setCookiesFromResponse(response);

  // cookiesStore.set("accessToken", accessToken);
  // cookiesStore.set("refreshToken", refreshToken);

  return NextResponse.json(response.data);
}
