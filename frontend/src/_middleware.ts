"use client"
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rotas protegidas
const protectedRoutes = ["/account", "/admin"];

export function middleware(request: NextRequest) {
    const refreshToken = request.cookies.get("refreshToken")?.value;
    
    if (protectedRoutes.includes(request.nextUrl.pathname) && !refreshToken) {
        return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    return NextResponse.next();
}

// Define para quais rotas o middleware será executado
export const config = {
    matcher: ["/account/:path*", "/admin/:path*"], // Rotas protegidas
};
