import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./lib/session";

const publicRoutes = ["/", "/signup", "/login"];
const userRoutes = ["/user"];
const adminRoutes = ["/admin"];

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicRoute = publicRoutes.includes(path);
  const isUserRoute = userRoutes.includes(path);
  const isAdminRoute = adminRoutes.includes(path);

  const cookieStore = cookies();
  const cookie = cookieStore.get("session")?.value || null;
  const session = cookie ? await decrypt(cookie) : null;

  if (!session) {
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  } else {
    const { userId, role } = session;

    if (isPublicRoute) {
      if (role === "user" && userId) {
        return NextResponse.redirect(new URL("/user", request.nextUrl));
      }
      if (role === "admin" && userId) {
        return NextResponse.redirect(new URL("/admin", request.nextUrl));
      }
    }

    if (isUserRoute && role !== "user") {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (isAdminRoute && role !== "admin") {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
