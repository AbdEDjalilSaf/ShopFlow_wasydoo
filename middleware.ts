// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // If no access token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/Auth', request.url));
  }

  // Optional: Refresh token if token expired (e.g., ping API to verify)
  // Add logic here to refresh and set cookies using NextResponse.cookies

  return NextResponse.next();
}

export const config = {
  matcher: ['/users/:path*', '/products/:path*','/products/[id]/:path*'], // Protected routes
};
