import { api } from "@/lib/api";
import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

export async function POST() {
  const cookiesStore = await cookies();
  const serverHeaders = await headers();
  const accessToken = cookiesStore.get("accessToken")?.value;

  try {
    const response = await api.post("/auth/sign-out", undefined, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Cookie: cookiesStore.toString(),
        "x-forwarded-for": serverHeaders.get("x-forwarded-for") || "127.0.0.1",
        "user-agent": serverHeaders.get("user-agent") || "Next.js Server",
      },
      credentials: "include",
    });

    cookiesStore.delete("accessToken");
    cookiesStore.delete("refreshToken");

    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 401 });
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }
}
