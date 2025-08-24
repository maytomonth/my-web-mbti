import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore Next.js internals, API, favicon, and static files
  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // Already localized → let next-intl attach locale headers without redirect
  if (pathname.startsWith('/ko') || pathname.startsWith('/en')) {
    const intl = createMiddleware({
      locales: ['en', 'ko'],
      defaultLocale: 'en',
      localeDetection: false,
    });
    return intl(request);
  }

  const langHeader = request.headers.get('accept-language') || '';
  const locale = langHeader.toLowerCase().startsWith('ko') ? 'ko' : 'en';

  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: ['/', '/((?!_next|api|favicon.ico|.*\\..*).*)'],
};
