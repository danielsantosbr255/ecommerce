import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rotas protegidas
const protectedRoutes = ["/account", "/admin"];

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  console.log("refreshToken", refreshToken)

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/admin/:path*"], // Rotas protegidas
};
