'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, Heart } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations('app.nav');
  const th = useTranslations('home');
  const locale = useLocale();
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8">
        {/* Left Side - MBTI Test */}
        <Card className="p-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-lg transition-shadow">
          <div className="mb-6">
            <Brain className="h-16 w-16 mx-auto text-blue-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{th('personalityTitle')}</h2>
            <p className="text-gray-600 mb-6">{th('personalityDescription')}</p>
          </div>
          <Button asChild size="lg" className="w-full">
            <Link href={`/${locale}/test`}>{t('test')}</Link>
          </Button>
        </Card>

        {/* Right Side - Compatibility Check */}
        <Card className="p-8 text-center bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200 hover:shadow-lg transition-shadow">
          <div className="mb-6">
            <Heart className="h-16 w-16 mx-auto text-pink-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{th('compatibilityTitle')}</h2>
            <p className="text-gray-600 mb-6">{th('compatibilityDescription')}</p>
          </div>
          <Button asChild size="lg" variant="outline" className="w-full bg-transparent">
            <Link href={`/${locale}/match`}>{t('match')}</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
