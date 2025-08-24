# 환경 변수 설정 가이드

## 1. 환경 변수 파일 생성

### 개발 환경 (.env.local)

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# 개발 환경 설정
SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# OG 이미지 URL
NEXT_PUBLIC_OG_IMAGE_URL=http://localhost:3000/og-image.png

# 앱 정보
APP_NAME="MBTI 탐험가"
APP_DESCRIPTION="정확한 MBTI 테스트로 나만의 성격 유형을 알아보세요. 따뜻한 일러스트와 함께하는 심리 테스트!"
```

### 운영 환경 (.env.production)

배포 시 `.env.production` 파일을 생성하거나 배포 플랫폼에서 다음 환경 변수를 설정하세요:

```bash
# 운영 환경 설정
SITE_URL=https://test.maymonth.com
NEXT_PUBLIC_SITE_URL=https://test.maymonth.com

# OG 이미지 URL
NEXT_PUBLIC_OG_IMAGE_URL=https://test.maymonth.com/og-image.png

# 앱 정보
APP_NAME="MBTI 탐험가"
APP_DESCRIPTION="정확한 MBTI 테스트로 나만의 성격 유형을 알아보세요. 따뜻한 일러스트와 함께하는 심리 테스트!"
```

## 2. Sitemap 생성

### 자동 생성 (빌드 시)

```bash
pnpm build
```

### 수동 생성

```bash
pnpm sitemap
```

## 3. 생성되는 파일들

- `public/sitemap.xml` - 사이트맵
- `public/robots.txt` - robots.txt 파일

## 4. SEO 최적화 확인사항

### ✅ 완료된 설정

- [x] 메타 태그 자동화
- [x] Open Graph 태그
- [x] Twitter Card 태그
- [x] 환경별 URL 설정
- [x] Sitemap 자동 생성
- [x] Robots.txt 생성
- [x] 다국어 지원

### 📋 추가 작업 권장사항

- [ ] `public/og-image.png` 파일 추가 (1200x630px)
- [ ] Google Search Console 등록
- [ ] Google Analytics 설정
- [ ] 성능 최적화 (Core Web Vitals)

## 5. 사용 방법

### SEO 설정 사용

```typescript
import { getPageSEO } from '@/lib/seo-config';

// 페이지별 SEO 설정
export const metadata = getPageSEO('test', 'ko');
```

### 사용자 정의 SEO 설정

```typescript
import { createSEOConfig } from '@/lib/seo-config';

export const metadata = createSEOConfig({
  title: '커스텀 페이지 제목',
  description: '커스텀 설명',
  url: '/custom-page',
});
```

## 6. 환경 변수 설명

| 변수명                     | 설명                             | 필수 여부                     |
| -------------------------- | -------------------------------- | ----------------------------- |
| `SITE_URL`                 | 사이트 기본 URL                  | 선택 (기본값: localhost:3000) |
| `NEXT_PUBLIC_SITE_URL`     | 클라이언트에서 사용할 사이트 URL | 선택                          |
| `NEXT_PUBLIC_OG_IMAGE_URL` | OG 이미지 URL                    | 선택                          |
| `APP_NAME`                 | 앱 이름                          | 선택                          |
| `APP_DESCRIPTION`          | 앱 설명                          | 선택                          |

## 7. 트러블슈팅

### Sitemap이 생성되지 않는 경우

1. `next-sitemap.config.js` 파일이 루트에 있는지 확인
2. 환경 변수 `SITE_URL`이 올바르게 설정되었는지 확인
3. `pnpm sitemap` 명령어로 수동 생성 시도

### OG 이미지가 표시되지 않는 경우

1. `public/og-image.png` 파일이 존재하는지 확인
2. 이미지 크기가 1200x630px인지 확인
3. 환경 변수 `NEXT_PUBLIC_OG_IMAGE_URL`이 올바른지 확인
