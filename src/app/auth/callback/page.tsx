'use client';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import useGoogleLoginHook from '@/Routes/Client/hook/POST/GoogleLogin.hook';
import { Loader2 } from 'lucide-react';

export default function GoogleCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');
  const GoogleLoginMutation = useGoogleLoginHook();

  useEffect(() => {
    if (code) {
      const redirectPath = sessionStorage.getItem('redirectPath') || '/';
      GoogleLoginMutation.mutate(code, {
        onSuccess: () => {
          sessionStorage.removeItem('redirectPath');
          router.push(redirectPath);
        },
        onError: () => {
          router.push('/');
        },
      });
    }
  }, [code, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 text-center">
      <Loader2 className="animate-spin h-20 w-20 text-gray-500" />
      <p className="text-lg text-gray-600">Processing Google Login...</p>
    </div>
  );
}
