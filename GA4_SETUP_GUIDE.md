# Google Analytics 4 (GA4) 설정 가이드

## ✅ 완료된 설정

### 1. 기본 GA4 설정

- **추적 ID**: `G-ETGKHCXJ46`
- **자동 페이지뷰 추적** ✅
- **라우트 변경 시 추적** ✅
- **프로덕션 환경에서만 활성화** ✅

### 2. 생성된 파일들

#### `lib/gtag.ts`

```typescript
// GA4 설정 및 유틸리티 함수
export const GA_TRACKING_ID = 'G-ETGKHCXJ46';
export const pageview = (url: URL | string) => { ... }
export const event = (action: string, parameters?: {...}) => { ... }
export const trackMBTIEvents = { ... } // MBTI 전용 이벤트 추적
```

#### `components/route-change-tracker.tsx`

```typescript
// 라우트 변경 감지 및 페이지뷰 추적
// Suspense로 래핑되어 useSearchParams() 안전하게 사용
```

#### `app/layout.tsx` (수정됨)

- Google Analytics 스크립트 추가
- `strategy="afterInteractive"` 설정으로 개발 중 경고 방지
- RouteChangeTracker 컴포넌트 추가

#### `components/share-link-button.tsx` (수정됨)

- 링크 공유 시 GA 이벤트 추적 추가

## 🚀 사용법

### 1. 환경 변수 설정

`.env.local` 파일에 다음을 추가하세요:

```bash
# 개발 중에 GA 디버깅을 원하면 'true'로 설정
NEXT_PUBLIC_GA_DEBUG=false

# 프로덕션에서는 설정하지 않음 (기본적으로 프로덕션에서만 활성화)
```

### 2. 개발 중 테스트

개발 환경에서 GA를 테스트하려면:

```bash
# .env.local에 추가
NEXT_PUBLIC_GA_DEBUG=true
```

이후 브라우저 콘솔에서 GA 이벤트 로그를 확인할 수 있습니다.

### 3. MBTI 전용 이벤트 추적

```typescript
import { trackMBTIEvents } from '@/lib/gtag';

// 테스트 시작
trackMBTIEvents.startTest();

// 질문 답변
trackMBTIEvents.answerQuestion(1, 'strongly_agree');

// 테스트 완료
trackMBTIEvents.completeTest('INTJ');

// 궁합 테스트 시작
trackMBTIEvents.startCompatibilityTest();

// 궁합 결과 확인
trackMBTIEvents.checkCompatibility('INTJ', 'ENFP', 85);

// 결과 공유
trackMBTIEvents.shareResult('INTJ', 'copy_link');
```

### 4. 커스텀 이벤트 추가

```typescript
import { event } from '@/lib/gtag';

// 일반적인 이벤트 추적
event('button_click', {
  event_category: 'engagement',
  event_label: 'Header CTA',
  custom_parameter: 'value',
});
```

## 📊 추적되는 이벤트

### 자동 추적

- ✅ **페이지뷰**: 모든 라우트 변경 시
- ✅ **링크 공유**: 결과 공유 버튼 클릭 시

### MBTI 전용 이벤트

- `mbti_test_start`: 테스트 시작
- `mbti_question_answered`: 질문 답변
- `mbti_test_complete`: 테스트 완료
- `mbti_compatibility_start`: 궁합 테스트 시작
- `mbti_compatibility_check`: 궁합 결과 확인
- `mbti_result_share`: 결과 공유

## 🛠 GA4 대시보드에서 확인하기

### 1. 실시간 데이터

- GA4 → Reports → Realtime
- 현재 활성 사용자 및 이벤트 확인

### 2. 이벤트 추적

- GA4 → Reports → Engagement → Events
- 커스텀 이벤트 `mbti_*` 확인

### 3. 사용자 경로 분석

- GA4 → Explore → Path exploration
- `/ko/mbti` → `/ko/mbti/result` 경로 분석

## 🔧 문제 해결

### Q: 개발 환경에서 GA가 작동하지 않아요

A: `.env.local`에 `NEXT_PUBLIC_GA_DEBUG=true` 설정 후 재시작

### Q: 이벤트가 GA4에 나타나지 않아요

A:

1. 브라우저 콘솔에서 에러 확인
2. 네트워크 탭에서 `collect` 요청 확인
3. GA4는 실시간 데이터에 1-2분 지연 있음

### Q: 빌드 에러가 발생해요

A: `RouteChangeTracker`가 Suspense로 래핑되어 있는지 확인

## 📈 추가 개선사항

### 향후 구현 가능한 기능들

- 질문별 이탈률 분석
- A/B 테스트 구현
- 사용자 세그먼트 분석
- 전환 퍼널 최적화

---

**참고**: 이 설정은 프로덕션에서 바로 사용 가능하며, GDPR/개인정보보호 정책 준수를 위해 쿠키 동의 배너 추가를 고려해보세요.
