'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { questions } from '@/lib/mbti-data';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function QuestionPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('labels');
  const tq = useTranslations('questions');
  const ta = useTranslations('answers');

  const questionId = parseInt(params.id as string, 10);
  const currentQuestion = questions.find((q) => q.id === questionId);
  const questionIndex = questions.findIndex((q) => q.id === questionId);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  if (!currentQuestion) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl text-center">
        <p>질문을 찾을 수 없습니다.</p>
        <Button asChild className="mt-4">
          <Link href={`/${locale}/test`}>테스트로 돌아가기</Link>
        </Button>
      </div>
    );
  }

  const progress = ((questionIndex + 1) / questions.length) * 100;

  const answerOptions = [
    { value: 4, label: ta('stronglyAgree') },
    { value: 3, label: ta('agree') },
    { value: 2, label: ta('disagree') },
    { value: 1, label: ta('stronglyDisagree') },
  ];

  const handleNext = () => {
    if (selectedAnswer !== null) {
      // 여기서 답변을 저장하는 로직을 추가할 수 있습니다
      // localStorage 또는 상태 관리를 통해 답변을 저장

      if (questionIndex < questions.length - 1) {
        // 다음 질문으로 이동
        const nextQuestionId = questions[questionIndex + 1].id;
        router.push(`/${locale}/questions/${nextQuestionId}`);
      } else {
        // 테스트 완료, 결과 페이지로 이동
        router.push(`/${locale}/test/result`);
      }
    }
  };

  const handlePrevious = () => {
    if (questionIndex > 0) {
      const prevQuestionId = questions[questionIndex - 1].id;
      router.push(`/${locale}/questions/${prevQuestionId}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" asChild>
          <Link href={`/${locale}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('home') ?? '메인으로'}
          </Link>
        </Button>
        <div className="text-sm text-muted-foreground">
          {t('question') ?? '문항'} {questionIndex + 1} / {questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <Progress value={progress} className="mb-8" />

      {/* Question Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg text-center">{tq(`q${currentQuestion.id}`)}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Question Image */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <Image
                src={currentQuestion.image}
                alt={`Question ${currentQuestion.id} illustration`}
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

      {/* Navigation Buttons */}
      <div className="flex gap-4 justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={questionIndex === 0}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          이전
        </Button>

        <Button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="flex-1 max-w-xs ml-auto"
        >
          {questionIndex < questions.length - 1 ? (
            <>
              {t('next') ?? '다음'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          ) : (
            t('getResults') ?? '결과 보기'
          )}
        </Button>
      </div>
    </div>
  );
}
