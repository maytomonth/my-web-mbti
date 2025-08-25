'use client';

import { AdPlaceholder } from '@/components/ad-placeholder';
import { ShareLinkButton } from '@/components/share-link-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { mbtiCompatibility } from '@/lib/mbti-match';
import { mbtiResults } from '@/lib/mbti-results';
import { Heart, ThumbsDown, ThumbsUp, User } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// 이 페이지는 localStorage API와 동적 URL 파라미터를 사용하므로 동적 렌더링을 설정합니다.
export const dynamic = 'force-dynamic';

export default function MatchResultPage() {
  const searchParams = useSearchParams();
  const [userType, setUserType] = useState<string>('');
  const [partnerType, setPartnerType] = useState<string>('');
  const [isClient, setIsClient] = useState(false);
  const tr = useTranslations('result');
  const ta = useTranslations('actions');
  const tm = useTranslations('mbti.types');
  const tc = useTranslations('mbti.compatibility');
  const locale = useLocale();

  useEffect(() => {
    setIsClient(true);

    const userParam = searchParams.get('user');
    const partnerParam = searchParams.get('partner');

    if (userParam && partnerParam) {
      setUserType(userParam);
      setPartnerType(partnerParam);
    } else {
      // Fallback to localStorage or default (브라우저 환경에서만)
      if (typeof window !== 'undefined') {
        const storedResult = localStorage.getItem('mbtiResult');
        if (storedResult) {
          setUserType(storedResult);
          setPartnerType('ENFJ'); // Default for demo
        }
      }
    }
  }, [searchParams]);

  if (!userType || !partnerType) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl text-center">
        <p>
          {locale === 'ko'
            ? '잘못된 MBTI 유형입니다. 다시 시도해주세요.'
            : 'Invalid MBTI types. Please try again.'}
        </p>
        <Button asChild className="mt-4">
          <Link href={`/${locale}/mbti/match`}>
            {locale === 'ko' ? '궁합 테스트로 돌아가기' : 'Go back to compatibility test'}
          </Link>
        </Button>
      </div>
    );
  }

  const userInfo = mbtiResults.find((r) => r.type === userType);
  const partnerInfo = mbtiResults.find((r) => r.type === partnerType);
  const comp =
    mbtiCompatibility.find((c) => c.from === userType && c.to === partnerType) ||
    mbtiCompatibility.find((c) => c.from === partnerType && c.to === userType);

  // 번역된 MBTI 정보 가져오기
  const userTranslatedInfo = tm.has(userType)
    ? {
        name: tm(`${userType}.name`),
        description: tm(`${userType}.description`),
      }
    : null;

  const partnerTranslatedInfo = tm.has(partnerType)
    ? {
        name: tm(`${partnerType}.name`),
        description: tm(`${partnerType}.description`),
      }
    : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="grid gap-6">
        {/* User Type Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {tr('yourType')}: {userType}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-lg">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline">{userType}</Badge>
                  {userTranslatedInfo && (
                    <span className="text-sm text-muted-foreground">{userTranslatedInfo.name}</span>
                  )}
                </div>
                {userTranslatedInfo && (
                  <p className="text-sm text-muted-foreground">{userTranslatedInfo.description}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compatibility Score Card */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Heart className="h-5 w-5" />
              {tr('compatibilityScore')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {comp ? (
              <>
                <div className="mb-4">
                  <div className="text-4xl font-bold text-primary mb-2">{comp.score}%</div>
                  <Progress value={comp.score} className="w-full max-w-xs mx-auto" />
                </div>
                <div className="grid md:grid-cols-2 gap-6 mt-6 text-left">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <ThumbsUp className="h-4 w-4 text-green-600" /> {tr('strengths')}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {comp.pros === '서로 다른 관점을 존중하며 새로운 시각을 배울 수 있습니다.'
                        ? tc('defaultPros')
                        : comp.pros}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <ThumbsDown className="h-4 w-4 text-orange-600" /> {tr('challenges')}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {comp.cons === '성격 차이로 인해 초기에는 이해가 어려울 수 있습니다.'
                        ? tc('defaultCons')
                        : comp.cons}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                {locale === 'ko'
                  ? '해당 조합의 궁합 데이터가 아직 준비되지 않았어요.'
                  : 'Compatibility data for this combination is not yet available.'}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Ad Placeholder */}
        <AdPlaceholder />

        {/* Partner Type Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              {tr('partnerType')}: {partnerType}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="bg-pink-100 p-4 rounded-lg">
                <Heart className="h-8 w-8 text-pink-600" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline">{partnerType}</Badge>
                  {partnerTranslatedInfo && (
                    <span className="text-sm text-muted-foreground">
                      {partnerTranslatedInfo.name}
                    </span>
                  )}
                </div>
                {partnerTranslatedInfo && (
                  <p className="text-sm text-muted-foreground">
                    {partnerTranslatedInfo.description}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button variant="outline" asChild>
            <Link href={`/${locale}/mbti/match`}>{tr('tryAnotherMatch')}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/${locale}/mbti/test`}>{tr('retakeTest')}</Link>
          </Button>
          <Button asChild>
            <Link href={`/${locale}/mbti`}>{tr('backToHome')}</Link>
          </Button>
        </div>

        {/* 공유 영역 */}
        <ShareLinkButton className="mt-6" matchTypes={{ user: userType, partner: partnerType }} />
      </div>
    </div>
  );
}
