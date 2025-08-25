'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';

interface StructuredDataProps {
  type: 'website' | 'mbtiTest' | 'mbtiResult' | 'compatibilityTest';
  data?: {
    resultType?: string;
    userType?: string;
    partnerType?: string;
    score?: number;
  };
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const locale = useLocale();
  const siteUrl = 'https://test.maytomonth.com';

  useEffect(() => {
    // 브라우저 환경에서만 실행
    if (typeof window === 'undefined') {
      return;
    }

    const generateStructuredData = () => {
      const baseData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: locale === 'ko' ? 'MBTI 탐험가' : 'MBTI Explorer',
        description:
          locale === 'ko'
            ? '정확한 MBTI 테스트로 나만의 성격 유형을 알아보세요.'
            : 'Discover your unique personality type with our accurate MBTI test.',
        url: `${siteUrl}/${locale}`,
        inLanguage: locale === 'ko' ? 'ko-KR' : 'en-US',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/${locale}/mbti`,
          'query-input': 'required name=search_term_string',
        },
      };

      let structuredData;

      switch (type) {
        case 'website':
          structuredData = baseData;
          break;

        case 'mbtiTest':
          structuredData = {
            ...baseData,
            '@type': 'Quiz',
            name: locale === 'ko' ? 'MBTI 성격 테스트' : 'MBTI Personality Test',
            description:
              locale === 'ko'
                ? '20개 질문으로 나만의 MBTI 성격 유형을 알아보세요.'
                : 'Discover your MBTI personality type with 20 questions.',
            url: `${siteUrl}/${locale}/mbti`,
            educationalLevel: 'General',
            teaches: locale === 'ko' ? 'MBTI 성격 유형 분석' : 'MBTI Personality Type Analysis',
          };
          break;

        case 'mbtiResult':
          if (data?.resultType) {
            structuredData = {
              ...baseData,
              '@type': 'Person',
              name: `${data.resultType} ${locale === 'ko' ? '성격 유형' : 'Personality Type'}`,
              description: `${data.resultType} ${
                locale === 'ko'
                  ? '유형의 성격 특징과 궁합 정보'
                  : 'personality traits and compatibility'
              }`,
              url: `${siteUrl}/${locale}/mbti/result`,
              additionalType: 'https://schema.org/PersonalityType',
              identifier: data.resultType,
            };
          } else {
            structuredData = baseData;
          }
          break;

        case 'compatibilityTest':
          if (data?.userType && data?.partnerType) {
            structuredData = {
              ...baseData,
              '@type': 'Quiz',
              name:
                locale === 'ko'
                  ? `${data.userType} × ${data.partnerType} 궁합 결과`
                  : `${data.userType} × ${data.partnerType} Compatibility Result`,
              description:
                locale === 'ko'
                  ? `${data.userType}와 ${data.partnerType} 유형의 궁합 분석 결과`
                  : `Compatibility analysis between ${data.userType} and ${data.partnerType} types`,
              url: `${siteUrl}/${locale}/mbti/match/result?user=${data.userType}&partner=${data.partnerType}`,
              ...(data.score && {
                about: {
                  '@type': 'Thing',
                  name: locale === 'ko' ? '궁합 점수' : 'Compatibility Score',
                  description: `${data.score}%`,
                },
              }),
            };
          } else {
            structuredData = {
              ...baseData,
              '@type': 'Quiz',
              name: locale === 'ko' ? 'MBTI 궁합 테스트' : 'MBTI Compatibility Test',
              url: `${siteUrl}/${locale}/mbti/match`,
            };
          }
          break;

        default:
          structuredData = baseData;
      }

      // 기존 구조화 데이터 제거
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }

      // 새 구조화 데이터 추가
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    };

    generateStructuredData();
  }, [type, data, locale, siteUrl]);

  return null; // 이 컴포넌트는 렌더링하지 않음
}
