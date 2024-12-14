import { NextResponse } from "next/server";
import { authToken } from "./server/user";
import { isAdmin } from "./lib/isAuthValid";
import { useAuth } from "./context/AuthContext";

export async function middleware(request) {

  const path = request.nextUrl.pathname;
  const isPublic = path === "/" || path === "/signup" || path === "/login";
  const userPath = "/user";
  const adminPath = "/admin";
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
