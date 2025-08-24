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
import { useState } from 'react';

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
  const tm = useTranslations('match');
  const locale = useLocale();

  const handleCheckCompatibility = () => {
    if (userType && partnerType) {
      // In a real app, you'd pass these as URL params or store in state
      window.location.href = `/${locale}/match/result?user=${userType}&partner=${partnerType}`;
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
