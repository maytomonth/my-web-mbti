// Google Analytics 4 (GA4) 설정 및 유틸리티 함수

declare global {
  interface Window {
    gtag: (command: string, targetId: string | Date, parameters?: Record<string, any>) => void;
  }
}

export const GA_TRACKING_ID = 'G-ETGKHCXJ46';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL | string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (
  action: string,
  parameters?: {
    event_category?: string;
    event_label?: string;
    value?: number;
    [key: string]: any;
  },
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, parameters);
  }
};

// 개발 환경에서 GA 활성화 여부 확인
export const isGAEnabled = () => {
  return process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_GA_DEBUG === 'true';
};

// MBTI 테스트 관련 이벤트 추적 함수들
export const trackMBTIEvents = {
  // 테스트 시작
  startTest: () => {
    event('mbti_test_start', {
      event_category: 'engagement',
      event_label: 'MBTI Test',
    });
  },

  // 질문 답변
  answerQuestion: (questionId: number, answer: string) => {
    event('mbti_question_answered', {
      event_category: 'engagement',
      event_label: `Question ${questionId}`,
      custom_question_id: questionId,
      custom_answer: answer,
    });
  },

  // 테스트 완료
  completeTest: (resultType: string) => {
    event('mbti_test_complete', {
      event_category: 'conversion',
      event_label: resultType,
      custom_mbti_type: resultType,
    });
  },

  // 궁합 테스트 시작
  startCompatibilityTest: () => {
    event('mbti_compatibility_start', {
      event_category: 'engagement',
      event_label: 'Compatibility Test',
    });
  },

  // 궁합 결과 확인
  checkCompatibility: (userType: string, partnerType: string, score: number) => {
    event('mbti_compatibility_check', {
      event_category: 'engagement',
      event_label: `${userType} x ${partnerType}`,
      custom_user_type: userType,
      custom_partner_type: partnerType,
      custom_compatibility_score: score,
    });
  },

  // 결과 공유
  shareResult: (resultType: string, shareMethod: string = 'copy_link') => {
    event('mbti_result_share', {
      event_category: 'social',
      event_label: resultType,
      custom_mbti_type: resultType,
      custom_share_method: shareMethod,
    });
  },
};
