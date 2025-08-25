'use client';

import { AdPlaceholder } from '@/components/ad-placeholder';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { trackMBTIEvents } from '@/lib/gtag';
import { calculateMBTIType } from '@/lib/mbti-data';
import { mbtiQuestions } from '@/lib/mbti-questions';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// 이 페이지는 localStorage API를 사용하므로 동적 렌더링을 설정합니다.
export const dynamic = 'force-dynamic';

export default function MBTITestPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 테스트 시작 이벤트 추적
    trackMBTIEvents.startTest();
  }, []);

  const progress = ((currentQuestion + 1) / mbtiQuestions.length) * 100;

  const answerOptions = [
    { value: 4, label: '매우 그렇다' },
    { value: 3, label: '그렇다' },
    { value: 2, label: '아니다' },
    { value: 1, label: '전혀 아니다' },
  ];

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const numericAnswer = parseInt(selectedAnswer, 10);
      const newAnswers = [...answers, numericAnswer];
      setAnswers(newAnswers);

      // 질문 답변 이벤트 추적
      trackMBTIEvents.answerQuestion(currentQuestion + 1, selectedAnswer);

      if (currentQuestion < mbtiQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        const mbtiType = calculateMBTIType(newAnswers);

        // 브라우저 환경에서만 localStorage 사용
        if (mounted && typeof window !== 'undefined') {
          localStorage.setItem('mbtiResult', mbtiType);
        }

        // 테스트 완료 이벤트 추적
        trackMBTIEvents.completeTest(mbtiType);

        router.push('/mbti/result');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" asChild>
          <Link href="/mbti">
            <ArrowLeft className="h-4 w-4 mr-2" />
            메인으로
          </Link>
        </Button>
        <div className="text-sm text-muted-foreground">
          문항 {currentQuestion + 1} / {mbtiQuestions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <Progress value={progress} className="mb-8" />

      {/* Ad Placeholder */}
      {currentQuestion === 10 && <AdPlaceholder className="mb-8" />}

      {/* Question Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">
            {mbtiQuestions[currentQuestion].question || `질문 ${mbtiQuestions[currentQuestion].id}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Question Image */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <Image
                src={mbtiQuestions[currentQuestion].image}
                alt={`Question ${mbtiQuestions[currentQuestion].id} illustration`}
                width={590}
                height={0}
                style={{ height: 'auto' }}
                className="rounded-lg shadow-md"
                priority
              />
            </div>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {answerOptions.map((option) => {
              const isSelected = selectedAnswer === String(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelectedAnswer(String(option.value))}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#F1F6FF] border-[#A4C6FF] text-[#1E1E1E] font-medium shadow-sm'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Next Button */}
      <div className="text-center">
        <Button onClick={handleNext} disabled={selectedAnswer === null} size="lg">
          {currentQuestion < mbtiQuestions.length - 1 ? '다음' : '결과 보기'}
        </Button>
      </div>
    </div>
  );
}
