'use client';

import { AdPlaceholder } from '@/components/ad-placeholder';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Toggle } from '@/components/ui/toggle';
import { calculateMBTIType } from '@/lib/mbti-data';
import { mbtiQuestions } from '@/lib/mbti-questions';
import { ArrowLeft, ImageIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function TestPage() {
  const t = useTranslations('labels');
  const tq = useTranslations('questions');
  const ta = useTranslations('answers');
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);

  const progress = ((currentQuestion + 1) / mbtiQuestions.length) * 100;

  const answerOptions = [
    { value: 4, label: ta('stronglyAgree') },
    { value: 3, label: ta('agree') },
    { value: 2, label: ta('disagree') },
    { value: 1, label: ta('stronglyDisagree') },
  ];

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const numericAnswer = parseInt(selectedAnswer, 10);
      const newAnswers = [...answers, numericAnswer];
      setAnswers(newAnswers);

      if (currentQuestion < mbtiQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        const mbtiType = calculateMBTIType(newAnswers);
        localStorage.setItem('mbtiResult', mbtiType);
        router.push('/test/result');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('home') ?? 'Back to Main'}
          </Link>
        </Button>
        <div className="text-sm text-muted-foreground">
          {t('question') ?? 'Question'} {currentQuestion + 1} / {mbtiQuestions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <Progress value={progress} className="mb-8" />

      {/* Ad Placeholder */}
      {currentQuestion === 10 && <AdPlaceholder className="mb-8" />}

      {/* Question Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">{tq(`q${mbtiQuestions[currentQuestion].id}`)}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Illustration Placeholder */}
          <div className="bg-muted rounded-lg p-8 mb-6 flex items-center justify-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground" />
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {answerOptions.map((option) => (
              <Toggle
                key={option.value}
                variant="outline"
                className="w-full justify-start"
                pressed={selectedAnswer === String(option.value)}
                onPressedChange={(isPressed) =>
                  setSelectedAnswer(isPressed ? String(option.value) : null)
                }
              >
                {option.label}
              </Toggle>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Button */}
      <div className="text-center">
        <Button onClick={handleNext} disabled={selectedAnswer === null} size="lg">
          {currentQuestion < mbtiQuestions.length - 1
            ? t('next') ?? 'Next'
            : t('getResults') ?? 'Get Results'}
        </Button>
      </div>
    </div>
  );
}
