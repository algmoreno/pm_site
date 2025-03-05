import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"; // Helps extract the session token

export async function middleware(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  console.log("token", token)
  // If token exists, user is authenticated → Allow access
  if (token) {
    return NextResponse.next();
  }

  // Otherwise, redirect to login page
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: "/schedule", // Apply middleware to /schedule route
};