import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface GoogleLoginButtonProps {
  redirectTo?: string;
}

export function GoogleLoginButton({ redirectTo = '/' }: GoogleLoginButtonProps) {
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
  const REDIRECT_URI =
    process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/callback';

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
      className="w-max-2xl sm:w-[528px] h-[64px] border-r-[14px] rounded-[14px] border-[1px] mt-4 mb-4 font-[roboto] font-normal bg-transparent text-black
              hover:bg-transparent border-gray-400 flex items-center justify-center gap-2"
    >
      <Image src="/images/google.png" alt="Google Icon" width={20} height={20} />
      Continue with Google
    </Button>
  );
}
