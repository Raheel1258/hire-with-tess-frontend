import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface GoogleLoginButtonProps {
  redirectTo?: string;
}

export function GoogleLoginButton({ redirectTo = '/' }: GoogleLoginButtonProps) {
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
  const REDIRECT_URI =
    process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!;

  const googleAuthUrl =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&response_type=code` +
    `&scope=openid%20email%20profile` +
    `&access_type=offline` +
    `&prompt=consent`;

  return (
    <Button
      onClick={() => {
        sessionStorage.setItem('redirectPath', redirectTo);
        window.location.href = googleAuthUrl;
      }}
      className='sm:w-3xs h-11 mt-4 cursor-pointer p-2 hover:bg-gray-100 hover:text-black'
    >
      <Image src="/images/google.png" alt="Google Icon" width={20} height={20} />
      Continue with Google
    </Button>
  );
}
