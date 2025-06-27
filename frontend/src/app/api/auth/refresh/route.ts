import api from "@/lib/axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { setCookiesFromResponse } from "@/lib/cookies";

export async function POST() {
  const cookiesStore = await cookies();
  const refreshToken = cookiesStore.get("refreshToken")?.value;

  try {
    if (!refreshToken) {
      return NextResponse.json({ message: "Não autorizado" });
    }

    const response = await api.post("/auth/refresh");

    if (response.status !== 200) {
      throw new Error("Não autorizado");
    }

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
