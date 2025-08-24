import { Toaster } from '@/components/ui/sonner';
import { createSEOConfig } from '@/lib/seo-config';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
