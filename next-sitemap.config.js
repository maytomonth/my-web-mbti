/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://test.maytomonth.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  exclude: [
    '/ko/questions/*', // 개별 질문 페이지는 제외
    '/en/questions/*',
    '/api/*', // API 경로 제외
  ],
  alternateRefs: [
    {
      href: 'https://test.maytomonth.com/ko',
      hreflang: 'ko',
    },
    {
      href: 'https://test.maytomonth.com/en',
      hreflang: 'en',
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/ko/questions/', '/en/questions/'],
      },
    ],
    additionalSitemaps: ['https://test.maytomonth.com/sitemap.xml'],
  },
  transform: async (config, path) => {
    // 기본 변환 로직
    return {
      loc: path, // URL
      changefreq: getChangeFreq(path),
      priority: getPriority(path),
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  additionalPaths: async (config) => {
    // Next.js App Router 경로 수동 추가
    const paths = [
      '/ko',
      '/ko/mbti',
      '/ko/mbti/match',
      '/ko/mbti/result',
      '/ko/mbti/match/result',
      '/en',
      '/en/mbti',
      '/en/mbti/match',
      '/en/mbti/result',
      '/en/mbti/match/result',
    ];

    return paths.map((path) => ({
      loc: path,
      changefreq: getChangeFreq(path),
      priority: getPriority(path),
      lastmod: new Date().toISOString(),
    }));
  },
};

// 페이지별 변경 빈도 설정
function getChangeFreq(path) {
  if (path === '/ko' || path === '/en') {
    return 'daily'; // 메인 페이지는 자주 변경
  }
  if (path.includes('/mbti')) {
    return 'weekly'; // MBTI 관련 페이지는 주 단위
  }
  return 'monthly'; // 기타 페이지는 월 단위
}

// 페이지별 우선순위 설정
function getPriority(path) {
  if (path === '/ko' || path === '/en') {
    return 1.0; // 메인 페이지는 최고 우선순위
  }
  if (path.includes('/mbti') && !path.includes('/match') && !path.includes('/result')) {
    return 0.8; // MBTI 테스트 페이지는 높은 우선순위
  }
  if (path.includes('/mbti/match') && !path.includes('/result')) {
    return 0.7; // MBTI 궁합 페이지는 중간 높은 우선순위
  }
  if (path.includes('/result')) {
    return 0.6; // 결과 페이지는 중간 우선순위
  }
  return 0.5; // 기타 페이지는 기본 우선순위
}
