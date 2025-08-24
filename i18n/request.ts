import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const supported = ['en', 'ko'] as const;
  const active = supported.includes(locale as (typeof supported)[number]) ? locale : 'en';
  const messages = (await import(`../messages/${active}.json`)).default;
  return {
    messages,
    locale: active,
  };
});
