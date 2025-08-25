import { RouteChangeTracker } from '@/components/route-change-tracker';
import { Toaster } from '@/components/ui/sonner';
import { GA_TRACKING_ID, isGAEnabled } from '@/lib/gtag';
import { createSEOConfig } from '@/lib/seo-config';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import Script from 'next/script';
import type React from 'react';
import './globals.css';

export const metadata: Metadata = {
  ...createSEOConfig({
    title: 'MBTI로 알아보는 나의 성격',
    description:
      '정확한 MBTI 테스트로 나만의 성격 유형을 알아보세요. 따뜻한 일러스트와 함께하는 심리 테스트!',
    url: '/ko',
  }),
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <style>{`
html { font-family: ${GeistSans.style.fontFamily}; --font-sans: ${GeistSans.variable}; --font-mono: ${GeistMono.variable}; }
        `}</style>
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Google Analytics 4 (GA4) */}
        {isGAEnabled() && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_location: window.location.href,
                  page_title: document.title,
                });
              `}
            </Script>
          </>
        )}

        {/* 라우트 변경 추적 */}
        <RouteChangeTracker />

        {children}
        <Toaster />
      </body>
    </html>
  );
}
