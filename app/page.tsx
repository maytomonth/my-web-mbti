import { redirect } from 'next/navigation';

export default function HomePage() {
  // 홈페이지 접속 시 바로 MBTI 테스트로 리디렉션
  redirect('/mbti');
}
