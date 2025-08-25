'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Heart, User } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// 이 페이지는 브라우저 API나 런타임 조건이 포함되어 있어
// 빌드 시 정적 생성이 실패하므로 동적 렌더링을 강제로 설정합니다.
export const dynamic = 'force-dynamic';

const mbtiTypes = [
  'INTJ',
  'INTP',
  'ENTJ',
  'ENTP',
  'INFJ',
  'INFP',
  'ENFJ',
  'ENFP',
  'ISTJ',
  'ISFJ',
  'ESTJ',
  'ESFJ',
  'ISTP',
  'ISFP',
  'ESTP',
  'ESFP',
];

export default function MatchPage() {
  const [userType, setUserType] = useState('');
  const [partnerType, setPartnerType] = useState('');
  const [isClient, setIsClient] = useState(false);
  const tm = useTranslations('match');
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCheckCompatibility = () => {
    if (userType && partnerType) {
      // Next.js router를 사용하여 안전한 클라이언트 사이드 네비게이션
      router.push(`/${locale}/mbti/match/result?user=${userType}&partner=${partnerType}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <Button variant="outline" asChild className="mb-4 bg-transparent">
          <Link href={`/${locale}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {tm('backToMain')}
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-center">{tm('title')}</h1>
        <p className="text-muted-foreground text-center mt-2">{tm('subtitle')}</p>
      </div>

      {/* User Type Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {tm('yourTypeTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={userType} onValueChange={setUserType}>
            <SelectTrigger>
              <SelectValue placeholder={tm('yourTypePlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              {mbtiTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Partner Type Selection */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            {tm('partnerTypeTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={partnerType} onValueChange={setPartnerType}>
            <SelectTrigger>
              <SelectValue placeholder={tm('partnerTypePlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              {mbtiTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Check Compatibility Button */}
      <div className="text-center">
        <Button onClick={handleCheckCompatibility} disabled={!userType || !partnerType} size="lg">
          {tm('checkButton')}
        </Button>
      </div>
    </div>
  );
}
