import { Input } from 'components/ui/input';
import { Text } from 'components/ui/text';

import KakaoLoginButton from './_components/kakao-login-button';
import LoginButton from './_components/login-button';

/**
 * 로그인 페이지
 */
export default function LoginPage() {
  return (
    <section className="px-4">
      <Text>체험콕</Text>
      <Input />
      <Input />
      <LoginButton />

      <KakaoLoginButton />
    </section>
  );
}
