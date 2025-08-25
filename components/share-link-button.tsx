'use client';

import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

interface ShareLinkButtonProps {
  className?: string;
  customUrl?: string; // 특정 URL을 공유하고 싶을 때 사용
  resultType?: string; // MBTI 결과 타입 (예: "INTJ")
  matchTypes?: { user: string; partner: string }; // 궁합 테스트 결과용
}

export function ShareLinkButton({
  className,
  customUrl,
  resultType,
  matchTypes,
}: ShareLinkButtonProps) {
  const [copied, setCopied] = useState(false);
  const tr = useTranslations('result');

  // URL 생성 로직
  const getShareUrl = () => {
    if (customUrl) return customUrl;

    // 브라우저 환경 체크
    if (typeof window === 'undefined') {
      return 'https://test.maytomonth.com';
    }

    const baseUrl = 'https://test.maytomonth.com';
    const currentUrl = window.location.href;

    // 개발 환경에서는 현재 URL 사용, 프로덕션에서는 baseUrl 사용
    if (currentUrl.includes('localhost')) {
      return currentUrl;
    }

    // 프로덕션 환경에서 URL 재구성
    const pathname = window.location.pathname;
    const search = window.location.search;
    return `${baseUrl}${pathname}${search}`;
  };

  const handleCopyLink = async () => {
    // 브라우저 환경 체크
    if (typeof window === 'undefined') {
      toast.error('복사 기능을 사용할 수 없습니다.');
      return;
    }

    try {
      const shareUrl = getShareUrl();

      // navigator.clipboard API 사용 가능성 체크
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // Fallback: 텍스트 선택 방식
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success(tr('linkCopied'));
    } catch (error) {
      console.error('Failed to copy link:', error);
      toast.error('복사에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 공유 텍스트 생성
  const getShareText = () => {
    if (resultType) {
      return `${resultType} 성격 유형 결과를 확인해보세요!`;
    }
    if (matchTypes) {
      return `${matchTypes.user} × ${matchTypes.partner} 궁합 결과를 확인해보세요!`;
    }
    return '결과를 친구들과 공유해보세요!';
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${className || ''}`}>
      <div className="w-full border-t border-gray-200 my-6"></div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-3">{getShareText()}</p>

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
