import { api } from "@/lib/api";
import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { setCookiesFromResponse } from "@/lib/utils/cookies";

export async function POST() {
  const serverHeaders = await headers();
  const cookiesStore = await cookies();
  const refreshToken = cookiesStore.get("refreshToken")?.value;
  // console.log("🚀 [REFRESH] - Refresh token:", refreshToken);

  if (!refreshToken) {
    return NextResponse.json({ message: "Não autorizado" });
  }

  try {
    console.log("🚀 [REFRESH] - Enviando refresh token ao servidor...");

    const response = await api.post("/auth/refresh", undefined, {
      headers: {
        Cookie: cookiesStore.toString(),
        "x-forwarded-for": serverHeaders.get("x-forwarded-for") || "127.0.0.1",
        "user-agent": serverHeaders.get("user-agent") || "Next.js Server",
      },
    });

    // console.log("🚀 [REFRESH] - Resposta do servidor: ", response.data);

    setCookiesFromResponse(response);

    return NextResponse.json(response.data);
  } catch (error) {
    cookiesStore.delete("accessToken");
    cookiesStore.delete("refreshToken");

    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
}
