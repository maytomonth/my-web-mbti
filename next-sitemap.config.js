/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'http://localhost:3000',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // 페이지 수가 적으므로 단일 sitemap 사용
  exclude: [
    '/ko/questions/*', // 개별 질문 페이지는 제외
    '/en/questions/*',
    '/api/*', // API 경로 제외
  ],
  alternateRefs: [
    {
      href: process.env.SITE_URL || 'http://localhost:3000',
      hrefLang: 'ko',
    },
    {
      href: (process.env.SITE_URL || 'http://localhost:3000') + '/en',
      hrefLang: 'en',
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
    additionalSitemaps: [(process.env.SITE_URL || 'http://localhost:3000') + '/sitemap.xml'],
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
      '/ko/test',
      '/ko/match',
      '/ko/test/result',
      '/ko/match/result',
      '/en',
      '/en/test',
      '/en/match',
      '/en/test/result',
      '/en/match/result',
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
  if (path.includes('/test') || path.includes('/match')) {
    return 'weekly'; // 테스트 관련 페이지는 주 단위
  }
  return 'monthly'; // 기타 페이지는 월 단위
}

// 페이지별 우선순위 설정
function getPriority(path) {
  if (path === '/ko' || path === '/en') {
    return 1.0; // 메인 페이지는 최고 우선순위
  }
  if (path.includes('/test')) {
    return 0.8; // 테스트 페이지는 높은 우선순위
  }
  if (path.includes('/match')) {
    return 0.7; // 궁합 페이지는 중간 높은 우선순위
  }
  if (path.includes('/result')) {
    return 0.6; // 결과 페이지는 중간 우선순위
  }
  return 0.5; // 기타 페이지는 기본 우선순위
}
