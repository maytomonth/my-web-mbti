'use client';

import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

interface ShareLinkButtonProps {
  className?: string;
}

export function ShareLinkButton({ className }: ShareLinkButtonProps) {
  const [copied, setCopied] = useState(false);
  const tr = useTranslations('result');

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      // 피드백 표시 후 원상태로 복원
      setTimeout(() => setCopied(false), 2000);

      // 성공 토스트 알림
      toast.success(tr('linkCopied'));
    } catch (error) {
      console.error('Failed to copy link:', error);
      // 복사 실패 시 fallback - 모바일에서는 clipboard API가 제한될 수 있음
      try {
        // Fallback: 텍스트 선택 방식
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success(tr('linkCopied'));
      } catch (fallbackError) {
        console.error('Fallback copy also failed:', fallbackError);
        toast.error('복사에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${className || ''}`}>
      <div className="w-full border-t border-gray-200 my-6"></div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-3">결과를 친구들과 공유해보세요!</p>

        <Button
          variant="outline"
          size="default"
          onClick={handleCopyLink}
          disabled={copied}
          className="flex items-center gap-2 px-4 py-2 text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#4A4A4A"
            strokeWidth="1.8"
            className="flex-shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 13.5l3-3m-2.25 5.25L9 17.25a4.5 4.5 0 01-6.364-6.364l3-3a4.5 4.5 0 016.364 6.364zm3-3l2.25-2.25a4.5 4.5 0 116.364 6.364l-3 3a4.5 4.5 0 01-6.364-6.364z"
            />
          </svg>
          {copied ? '복사됨!' : tr('copyLink')}
        </Button>
      </div>
    </div>
  );
}
