'use client';

import { AdPlaceholder } from '@/components/ad-placeholder';
import { ShareLinkButton } from '@/components/share-link-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { trackMBTIEvents } from '@/lib/gtag';
import { mbtiCompatibility } from '@/lib/mbti-match';
import { mbtiResults } from '@/lib/mbti-results';
import { Heart, ThumbsDown, ThumbsUp, User } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// 이 페이지는 localStorage API와 동적 URL 파라미터를 사용하므로 동적 렌더링을 설정합니다.
export const dynamic = 'force-dynamic';

export default function MBTIMatchResultPage() {
  const searchParams = useSearchParams();
  const [userType, setUserType] = useState<string>('');
  const [partnerType, setPartnerType] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const userParam = searchParams.get('user');
    const partnerParam = searchParams.get('partner');

    if (userParam && partnerParam) {
      setUserType(userParam);
      setPartnerType(partnerParam);

      // 궁합 확인 이벤트 추적
      const comp =
        mbtiCompatibility.find((c) => c.from === userParam && c.to === partnerParam) ||
        mbtiCompatibility.find((c) => c.from === partnerParam && c.to === userParam);

      if (comp) {
        trackMBTIEvents.checkCompatibility(userParam, partnerParam, comp.score);
      }
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
        <p>잘못된 MBTI 유형입니다. 다시 시도해주세요.</p>
        <Button asChild className="mt-4">
          <Link href="/mbti/match">궁합 테스트로 돌아가기</Link>
        </Button>
      </div>
    );
  }

  const userInfo = mbtiResults.find((r) => r.type === userType);
  const partnerInfo = mbtiResults.find((r) => r.type === partnerType);
  const comp =
    mbtiCompatibility.find((c) => c.from === userType && c.to === partnerType) ||
    mbtiCompatibility.find((c) => c.from === partnerType && c.to === userType);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="grid gap-6">
        {/* User Type Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              나의 유형: {userType}
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
                  {userInfo && (
                    <span className="text-sm text-muted-foreground">{userInfo.name}</span>
                  )}
                </div>
                {userInfo && (
                  <p className="text-sm text-muted-foreground">{userInfo.description}</p>
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
              궁합 점수
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
                      <ThumbsUp className="h-4 w-4 text-green-600" /> 장점
                    </h4>
                    <p className="text-sm text-muted-foreground">{comp.pros}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <ThumbsDown className="h-4 w-4 text-orange-600" /> 주의사항
                    </h4>
                    <p className="text-sm text-muted-foreground">{comp.cons}</p>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                해당 조합의 궁합 데이터가 아직 준비되지 않았어요.
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
              상대방의 유형: {partnerType}
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
                  {partnerInfo && (
                    <span className="text-sm text-muted-foreground">{partnerInfo.name}</span>
                  )}
                </div>
                {partnerInfo && (
                  <p className="text-sm text-muted-foreground">{partnerInfo.description}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button variant="outline" asChild>
            <Link href="/mbti/match">다른 궁합 확인하기</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/mbti/test">테스트 다시하기</Link>
          </Button>
          <Button asChild>
            <Link href="/mbti">메인으로</Link>
          </Button>
        </div>

        {/* 공유 영역 */}
        <ShareLinkButton className="mt-6" matchTypes={{ user: userType, partner: partnerType }} />
      </div>
    </div>
  );
}
