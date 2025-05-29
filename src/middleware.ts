import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const role = request.cookies.get('userRole')?.value;
  const accessToken = request.cookies.get('accessToken')?.value;
  const path = request.nextUrl.pathname;

  if (path.startsWith('/auth/callback')) {
    return NextResponse.next();
  }

  if (accessToken) {
    if (path.startsWith('/signup') && role === 'admin') {
      return NextResponse.redirect(new URL('/employer/home', request.url));
    }

    if (path.startsWith('/admin') && role !== 'superadmin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    if (path.startsWith('/employer') && role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  } else {
    if (path.startsWith('/employer') || path.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/employer/:path*', '/admin/:path*'],
};
