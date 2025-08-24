import { getPageSEO } from '@/lib/seo-config';
import type { Metadata } from 'next';
import type React from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPageSEO('questions', locale as 'ko' | 'en');
}

export default function QuestionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
