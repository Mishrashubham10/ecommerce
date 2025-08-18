import { NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/', '/login', '/register'];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // GET TOKEN FROM COOKIES
  const token = req.cookies.get('token')?.value;

  // no token redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
  } catch (err) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
