import createNextIntlPlugin from 'next-intl/plugin';

// Point the plugin to the i18n request config
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  env: {
    SITE_URL: process.env.SITE_URL || 'http://localhost:3000',
    APP_NAME: process.env.APP_NAME || 'MBTI 탐험가',
    APP_DESCRIPTION:
      process.env.APP_DESCRIPTION || '정확한 MBTI 테스트로 나만의 성격 유형을 알아보세요.',
  },
};

export default withNextIntl(nextConfig);
