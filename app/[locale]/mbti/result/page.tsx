'use client';

import { ShareLinkButton } from '@/components/share-link-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mbtiResults } from '@/lib/mbti-results';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// 이 페이지는 클라이언트 사이드에서만 결과를 계산하므로 동적 렌더링을 설정합니다.
export const dynamic = 'force-dynamic';

type AxisPair = ['E' | 'I', 'S' | 'N', 'T' | 'F', 'J' | 'P'][number][] extends never
  ? never
  : ['E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P', 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'];

const axisPairs: AxisPair[] = [
  ['E', 'I'],
  ['S', 'N'],
  ['T', 'F'],
  ['J', 'P'],
];

// Mock data for demonstration
const mockedAnswers = {
  E: 3,
  I: 2,
  S: 1,
  N: 4,
  T: 4,
  F: 1,
  J: 3,
  P: 2,
};

function calculateMbtiFromAxisAnswers(totals: typeof mockedAnswers): string {
  const ei = totals.E >= totals.I ? 'E' : 'I';
  const sn = totals.S >= totals.N ? 'S' : 'N';
  const tf = totals.T >= totals.F ? 'T' : 'F';
  const jp = totals.J >= totals.P ? 'J' : 'P';

  return `${ei}${sn}${tf}${jp}`;
}

export default function TestResultPage() {
  const resultType = calculateMbtiFromAxisAnswers(mockedAnswers);
  const details = mbtiResults.find((item) => item.type === resultType);
  const tr = useTranslations('result');
  const locale = useLocale();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="mb-8 text-center">
        <CardHeader>
          <Badge variant="secondary" className="text-lg px-4 py-2 mb-2 inline-block">
            {resultType}
          </Badge>
          <CardTitle className="text-2xl">
            {resultType}
            {details ? ` – ${details.name}` : ''}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {details ? (
            <>
              <p className="text-muted-foreground mb-6">{details.description}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {details.keywords.map((kw) => (
                  <Badge key={kw} variant="outline">
                    {kw}
                  </Badge>
                ))}
              </div>
            </>
          ) : (
            <p className="text-muted-foreground">
              결과 상세 정보를 불러오는 중 문제가 발생했습니다.
            </p>
          )}
        </CardContent>
      </Card>

      {details && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">BEST 3 궁합 타입</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {details.bestMatches.map((match) => (
                <div
                  key={match.type}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-card text-card-foreground"
                >
                  <Badge variant="secondary" className="mt-0.5">
                    {match.type}
                  </Badge>
                  <p className="text-sm text-muted-foreground flex-1">{match.reason}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="text-center">
        <Button asChild size="lg">
          <Link href={`/${locale}/mbti/match`}>{tr('checkCompatibility')}</Link>
        </Button>
      </div>

      {/* 공유 영역 */}
      <ShareLinkButton className="mt-6" resultType={resultType} />
    </div>
  );
}
