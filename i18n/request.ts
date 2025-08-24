import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale은 middleware.ts에서 감지된 로케일입니다
  const locale = await requestLocale;

  // 지원되는 로케일인지 확인
  const supported = ['en', 'ko'] as const;
  if (!locale || !supported.includes(locale as any)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
