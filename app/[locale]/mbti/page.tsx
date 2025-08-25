'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, Heart } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

export default function MBTIHomePage() {
  const locale = useLocale();
  const t = useTranslations('app.nav');
  const th = useTranslations('home');

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{th('title')}</h1>
          <p className="text-xl text-gray-600">{th('subtitle')}</p>
        </div>

        {/* 메뉴 카드들 */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* MBTI 테스트 카드 */}
          <Card className="p-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-lg transition-shadow">
            <div className="mb-6">
              <Brain className="h-16 w-16 mx-auto text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{th('personalityTitle')}</h2>
              <p className="text-gray-600 mb-6">
                {th('personalityDescription')}
                <br />
                {locale === 'ko'
                  ? '20개의 질문으로 당신의 성격을 분석합니다.'
                  : 'Analyze your personality through 20 questions.'}
              </p>
            </div>
            <Button asChild size="lg" className="w-full">
              <Link href={`/${locale}/mbti/test`}>{th('personalityButton')}</Link>
            </Button>
          </Card>

          {/* MBTI 궁합 테스트 카드 */}
          <Card className="p-8 text-center bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200 hover:shadow-lg transition-shadow">
            <div className="mb-6">
              <Heart className="h-16 w-16 mx-auto text-pink-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{th('compatibilityTitle')}</h2>
              <p className="text-gray-600 mb-6">
                {th('compatibilityDescription')}
                <br />
                {locale === 'ko'
                  ? '서로의 성격 유형으로 궁합도를 분석합니다.'
                  : 'Analyze compatibility through personality types.'}
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="w-full bg-[#2b81d9] hover:bg-[#2b81d9]/90 text-white border-[#2b81d9]"
            >
              <Link href={`/${locale}/mbti/match`}>{th('compatibilityButton')}</Link>
            </Button>
          </Card>
        </div>

        {/* 하단 설명 */}
        <div className="text-center mt-12">
          <p className="text-gray-500">{th('bottomDescription')}</p>
        </div>
      </div>
    </div>
  );
}
