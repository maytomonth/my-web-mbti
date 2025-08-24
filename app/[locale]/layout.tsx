import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import type React from 'react';
import '../globals.css';

async function getMessages(locale: string) {
  try {
    const messages = (await import(`@/messages/${locale}.json`)).default;
    return messages;
  } catch (e) {
    return null;
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  if (!messages) notFound();

  return (
    <NextIntlClientProvider locale={locale} messages={messages} now={new Date()}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
