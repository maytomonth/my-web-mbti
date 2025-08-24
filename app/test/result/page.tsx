'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mbtiResults } from '@/lib/mbti-results';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

type AxisPair = ['E' | 'I', 'S' | 'N', 'T' | 'F', 'J' | 'P'][number][] extends never
  ? never
  : ['E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P', 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'];

type Answer = {
  axis: AxisPair;
  value: number; // positive -> first axis letter, negative -> second axis letter
};

const mockedAnswers: Answer[] = [
  { axis: ['E', 'I'], value: 2 },
  { axis: ['S', 'N'], value: -1 },
  { axis: ['T', 'F'], value: -2 },
  { axis: ['J', 'P'], value: 1 },
  { axis: ['E', 'I'], value: -1 },
  { axis: ['S', 'N'], value: 2 },
  { axis: ['T', 'F'], value: -1 },
  { axis: ['J', 'P'], value: -1 },
];

function calculateMbtiFromAxisAnswers(answers: Answer[]): string {
  const totals: Record<'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P', number> = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  };

  for (const { axis, value } of answers) {
    const [first, second] = axis;
    if (value >= 0) {
      totals[first] += Math.abs(value);
    } else {
      totals[second] += Math.abs(value);
    }
  }

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
          <Link href={`/${locale}/match`}>{tr('checkCompatibility')}</Link>
        </Button>
      </div>
    </div>
  );
}
