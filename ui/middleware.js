import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const PUBLIC_PATHS = ['/', '/login', '/register'];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // GET TOKEN FROM COOKIES
  const token = req.cookies.get('token')?.value;
  console.log("Cookies in middleware:", token);

  // no token redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // ✅ Protect role-based routes
    if (pathname.startsWith('/admin') && decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    if (pathname.startsWith('/seller') && decoded.role !== 'seller') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    // attach user info to request headers (optional)
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('userId', decoded.id);
    requestHeaders.set('userRole', decoded.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
    matcher: ['/admin/:path*', '/seller/:path*', '/customer/:path*']
}