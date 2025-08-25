import { Metadata } from 'next';

// 환경 변수에서 URL 가져오기 (클라이언트에서도 사용할 수 있도록 NEXT_PUBLIC_ 접두사 사용)
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://test.maytomonth.com';
const OG_IMAGE_URL = process.env.NEXT_PUBLIC_OG_IMAGE_URL || `${SITE_URL}/og-image.png`;
const APP_NAME = process.env.APP_NAME || 'MBTI 탐험가';
const APP_DESCRIPTION =
  process.env.APP_DESCRIPTION || '정확한 MBTI 테스트로 나만의 성격 유형을 알아보세요.';

export const siteConfig = {
  name: APP_NAME,
  description: APP_DESCRIPTION,
  url: SITE_URL,
  ogImage: OG_IMAGE_URL,
  creator: 'MBTI Explorer Team',
  keywords: ['MBTI', '성격 테스트', '궁합', '성격 유형', '심리테스트', 'MBTI 궁합'],
};

export function createSEOConfig(options: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  noIndex?: boolean;
  locale?: 'ko' | 'en';
}): Metadata {
  const {
    title,
    description = siteConfig.description,
    image = siteConfig.ogImage,
    url = siteConfig.url,
    noIndex = false,
    locale = 'ko',
  } = options;

  const fullTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name}`;
  const fullUrl = url.startsWith('http') ? url : `${siteConfig.url}${url}`;

  return {
    title: fullTitle,
    description,
    keywords: siteConfig.keywords,
    robots: noIndex ? 'noindex, follow' : 'index, follow',
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      type: 'website',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      url: fullUrl,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@mbti_explorer',
    },
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    metadataBase: new URL(siteConfig.url),
  };
}

// 페이지별 SEO 설정
export const pageConfigs = {
  home: {
    ko: {
      title: 'MBTI로 알아보는 나의 성격',
      description:
        '정확한 MBTI 테스트로 나만의 성격 유형을 알아보세요. 따뜻한 일러스트와 함께하는 심리 테스트!',
      url: '/ko',
    },
    en: {
      title: 'Discover Your MBTI Personality',
      description:
        'Take our comprehensive MBTI test to discover your unique personality type with warm illustrations!',
      url: '/en',
    },
  },
  test: {
    ko: {
      title: 'MBTI 성격 테스트',
      description:
        '20개 질문으로 나만의 MBTI 성격 유형을 알아보세요. 정확한 심리 테스트와 따뜻한 일러스트!',
      url: '/ko/mbti',
    },
    en: {
      title: 'MBTI Personality Test',
      description:
        'Discover your MBTI personality type with 20 questions. Accurate psychology test with warm illustrations!',
      url: '/en/mbti',
    },
  },
  match: {
    ko: {
      title: 'MBTI 궁합 테스트',
      description:
        '두 MBTI 유형의 궁합을 확인해보세요! 연인, 친구, 동료와의 호환성을 알아보는 심리 테스트',
      url: '/ko/mbti/match',
    },
    en: {
      title: 'MBTI Compatibility Test',
      description:
        'Check the compatibility between two MBTI types! Discover relationship compatibility for couples, friends, and colleagues',
      url: '/en/mbti/match',
    },
  },
  result: {
    ko: {
      title: 'MBTI 테스트 결과',
      description: '당신의 MBTI 성격 유형 결과를 확인하고 궁합 테스트도 해보세요!',
      url: '/ko/mbti/result',
    },
    en: {
      title: 'MBTI Test Result',
      description: 'Check your MBTI personality type result and try the compatibility test!',
      url: '/en/mbti/result',
    },
  },
  matchResult: {
    ko: {
      title: 'MBTI 궁합 결과',
      description: 'MBTI 유형별 궁합 결과를 확인하고 공유해보세요!',
      url: '/ko/mbti/match/result',
    },
    en: {
      title: 'MBTI Compatibility Result',
      description: 'Check your MBTI compatibility result and share it!',
      url: '/en/mbti/match/result',
    },
  },
  questions: {
    ko: {
      title: 'MBTI 성격 테스트 진행 중',
      description: '나만의 MBTI 성격 유형을 찾아가는 여정! 각 질문에 솔직하게 답해보세요.',
      url: '/ko/questions',
      noIndex: true,
    },
    en: {
      title: 'MBTI Personality Test In Progress',
      description:
        'Journey to discover your unique MBTI personality type! Answer each question honestly.',
      url: '/en/questions',
      noIndex: true,
    },
  },
};

// 헬퍼 함수: 로케일과 페이지에 따른 SEO 설정 생성
export function getPageSEO(page: keyof typeof pageConfigs, locale: 'ko' | 'en' = 'ko'): Metadata {
  const config = pageConfigs[page][locale];
  return createSEOConfig({
    title: config.title,
    description: config.description,
    url: config.url,
    noIndex: 'noIndex' in config ? config.noIndex : false,
    locale,
  });
}

// MBTI 결과 페이지용 동적 SEO 생성
export function createMBTIResultSEO(type: string, locale: 'ko' | 'en' = 'ko'): Metadata {
  const isKorean = locale === 'ko';
  const title = isKorean
    ? `${type} 성격 유형 결과 - MBTI 테스트`
    : `${type} Personality Type Result - MBTI Test`;
  const description = isKorean
    ? `${type} 유형의 성격 특징과 궁합을 확인해보세요. 다른 유형과의 궁합도 알아보기!`
    : `Discover ${type} personality traits and compatibility. Check compatibility with other types!`;

  return createSEOConfig({
    title,
    description,
    url: `/${locale}/mbti/result`,
    locale,
    image: `${SITE_URL}/${locale}/mbti/og-${type.toLowerCase()}.png`,
  });
}

// MBTI 궁합 결과 페이지용 동적 SEO 생성
export function createMBTIMatchSEO(
  userType: string,
  partnerType: string,
  locale: 'ko' | 'en' = 'ko',
): Metadata {
  const isKorean = locale === 'ko';
  const title = isKorean
    ? `${userType} × ${partnerType} 궁합 결과 - MBTI 궁합 테스트`
    : `${userType} × ${partnerType} Compatibility Result - MBTI Match Test`;
  const description = isKorean
    ? `${userType}와 ${partnerType} 유형의 궁합 점수와 분석을 확인해보세요!`
    : `Check compatibility score and analysis between ${userType} and ${partnerType} types!`;

  return createSEOConfig({
    title,
    description,
    url: `/${locale}/mbti/match/result?user=${userType}&partner=${partnerType}`,
    locale,
    image: `${SITE_URL}/${locale}/mbti/match/og-${userType.toLowerCase()}-${partnerType.toLowerCase()}.png`,
  });
}
