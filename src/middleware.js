import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./lib/session";

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  // List of public routes
  const publicRouter = ["/", "/signup", "/login"];

  // Check if the path matches any of the public routes
  const isPublicRoute = publicRouter.includes(path);
  const isUserRoute = path.startsWith("/user");
  const isAdminRoute = path.startsWith("/admin");

  // Get the session cookie
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session");
  const session = cookie ? await decrypt(cookie.value) : null;

  if (!session) {
    // If there's no session and the user is not on a public route, redirect to login
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  } else {
    const { userId, role } = session;

    // If the user is logged in, prevent access to public routes
    if (isPublicRoute) {
      if (role === "user" && userId) {
        return NextResponse.redirect(new URL("/user", request.nextUrl));
      }
      if (role === "admin" && userId) {
        return NextResponse.redirect(new URL("/admin", request.nextUrl));
      }
    }

    // If the user is on a /user route but is not a user, redirect to home
    if (isUserRoute && role !== "user") {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    // If the user is on an /admin route but is not an admin, redirect to home
    if (isAdminRoute && role !== "admin") {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
