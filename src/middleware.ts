import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {

    // Block access to /admin without admin role  
    // const role = request.cookies.get('userRole')?.value;  
    // if (request.nextUrl.pathname.startsWith('/admin') && role !== 'admin') {  
    //   return NextResponse.redirect(new URL('/403', request.url));  
    // }  


  const accessToken = request.cookies.get('accessToken')?.value; 
  const path = request.nextUrl.pathname;

  if (accessToken && path.startsWith('/login')) {
    return NextResponse.redirect(new URL('/employer/home', request.url));
  }

  if (!accessToken && path.startsWith('/employer')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/employer/:path*'],
};
