import { api } from "@/lib/api";
import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { setCookiesFromResponse } from "@/lib/cookies";

export async function POST() {
  const serverHeaders = await headers();
  const cookiesStore = await cookies();
  const refreshToken = cookiesStore.get("refreshToken")?.value;
  // console.log("🚀 [REFRESH] - Refresh token:", refreshToken);

  if (!refreshToken) {
    return NextResponse.json({ message: "Não autorizado" });
  }

  try {
    const response = await api.post("/auth/refresh", undefined, {
      headers: {
        Cookie: cookiesStore.toString(),
        "x-forwarded-for": serverHeaders.get("x-forwarded-for") || "127.0.0.1",
        "user-agent": serverHeaders.get("user-agent") || "Next.js Server",
      },
    });

    if (response.status !== 200) {
      cookiesStore.delete("accessToken");
      cookiesStore.delete("refreshToken");
      throw new Error("Não autorizado");
    }

    setCookiesFromResponse(response);

    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
}
