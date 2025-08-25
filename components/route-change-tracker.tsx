'use client';

import { isGAEnabled, pageview } from '@/lib/gtag';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

function RouteChangeTrackerContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isGAEnabled()) {
      return;
    }

    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');

    // 페이지뷰 추적
    pageview(url);

    // 개발 환경에서 디버깅용 로그
    if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_GA_DEBUG === 'true') {
      console.log('GA Pageview:', url);
    }
  }, [pathname, searchParams]);

  return null; // 이 컴포넌트는 렌더링하지 않음
}

export function RouteChangeTracker() {
  return (
    <Suspense fallback={null}>
      <RouteChangeTrackerContent />
    </Suspense>
  );
}
