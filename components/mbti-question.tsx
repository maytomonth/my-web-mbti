'use client';

import * as React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export type MBTIQuestionProps = {
  questionText: string;
  options: string[];
};

export function MBTIQuestion({ questionText, options }: MBTIQuestionProps) {
  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(undefined);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{questionText}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedValue} onValueChange={setSelectedValue} className="grid gap-3">
          {options.map((option, index) => {
            const optionId = `mbti-option-${index}`;
            return (
              <div key={optionId} className="flex items-center gap-3">
                <RadioGroupItem id={optionId} value={option} />
                <Label htmlFor={optionId}>{option}</Label>
              </div>
            );
          })}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}

export default MBTIQuestion;
