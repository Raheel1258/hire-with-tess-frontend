'use client';

import LoginForm from '@/app/interview/component/loginform';
import useHomeStore from '@/store/Employer/home.store';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

function LoginDialogueContent() {
  const jobId = useHomeStore((state) => state.jobId);

  return (
    <div className="w-full min-w-0 max-w-full max-sm:py-2 sm:py-4">
      <div className="flex flex-col items-center justify-center text-center max-sm:px-2">
        <h1 className="font-medium max-sm:text-lg max-sm:leading-snug sm:text-[24px] w-full sm:w-[607px]">
          Log In to Share Your AI-Generated Interview
        </h1>
        <p className="font-[400] max-sm:text-sm max-sm:leading-relaxed sm:text-[16px] sm:leading-[24px] text-[#606778] mt-2 w-full sm:w-[642px]">
          Easily create interviews and manage candidates
        </p>
      </div>

      <div className="w-full min-w-0 max-sm:mt-3 sm:mt-4">
        <div className="w-full min-w-0 max-sm:px-0 sm:px-4 max-sm:mt-2 sm:mt-4">
          <LoginForm jobId={jobId} variant="dialog" />
        </div>
        <p className="max-sm:mt-4 max-sm:px-2 sm:mt-0 text-sm text-gray-500 text-center">
          Don&apos;t have an account?{' '}
          <Link
            className="text-[#F7941D]"
            href={jobId ? `/signup?returnTo=/interview/review/${jobId}` : '/signup'}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginDialogue() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin" />
        </div>
      }
    >
      <LoginDialogueContent />
    </Suspense>
  );
}
