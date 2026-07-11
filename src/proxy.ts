import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "admin_session";
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-dev-secret"
);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Só protege rotas /admin
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Rota de login é pública
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Verifica se tem o cookie de sessão
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Verifica se o token é válido
  try {
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
