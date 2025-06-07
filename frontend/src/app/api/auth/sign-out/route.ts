import api from "@/lib/axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await api.post("/auth/sign-out");

    const cookiesStore = await cookies();
    cookiesStore.delete("accessToken");
    cookiesStore.delete("refreshToken");

    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 401 });
  }
}
