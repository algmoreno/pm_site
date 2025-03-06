import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"; // Helps extract the session token

export async function middleware(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  
  // If token exists, user is authenticated → Allow access
  if (token) {
    return NextResponse.next();
  }

  const userRole = token.role;

  const adminOnlyRoutes = ["/admin"];
  const userOnlyRoutes = ["/schedule"];

  // admin page redirecting non admin to unauthorized page
  if (adminOnlyRoutes.includes(requestedPath) && userRole !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // schedule page redirecting non members to login page
  if (userOnlyRoutes.includes(requestedPath) && userRole !== "user") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/schedule", "/admin", "/profile"],
};