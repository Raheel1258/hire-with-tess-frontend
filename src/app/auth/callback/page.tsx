'use client';
import { Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import useGoogleLoginHook from '@/Routes/Client/hook/POST/GoogleLogin.hook';
import { Loader2 } from 'lucide-react';

function GoogleCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');
  const GoogleLoginMutation = useGoogleLoginHook();

  useEffect(() => {
    if (!code || GoogleLoginMutation.isPending || GoogleLoginMutation.isSuccess) return;

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
  }, [code, router, GoogleLoginMutation]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0F172A] to-[#1E293B] px-4 text-white">
      <div className="max-w-5xl text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-bold mb-6 leading-tight">
          Hirewithtess
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl mb-4 font-semibold">
          Effortless Hiring with AI-Powered Assessments
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xl mx-auto">
          Easily generate a shareable link for candidates to complete their AI-powered
          interview anytime, anywhere. No scheduling required.
        </p>

        <div className="mt-12 flex flex-col items-center gap-4">
          <Loader2 className="animate-spin h-16 w-16 text-white" />
          <p className="text-lg text-gray-200">Processing your Google login...</p>
        </div>
      </div>
    </div>
  );
}

export default function GoogleCallback() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <GoogleCallbackPage />
    </Suspense>
  );
}
