import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rotas protegidas
const protectedRoutes = ["/account", "/dashboard"];

export function middleware(request: NextRequest) {
    // Verifica se tem token no cookie
    const token = request.cookies.get("token")?.value;

    // Se a rota for protegida e não houver token, redireciona para login
    if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
        return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    // Se estiver autenticado ou acessando páginas públicas, continua normalmente
    return NextResponse.next();
}

// Define para quais rotas o middleware será executado
export const config = {
    matcher: ["/account", "/dashboard"], // Rotas protegidas
};
