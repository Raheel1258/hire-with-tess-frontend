'use client';

import { useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { getAuthToken, getAuthRole } from '../Providers/auth';

export function useGoogleLoginRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = getAuthToken();
    const role = getAuthRole();
    const redirectPath =
      searchParams.get('redirectPath') || sessionStorage.getItem('redirectPath');

    const jobId = searchParams.get('jobId');

    if (pathname === '/auth/callback' && token) {
      setTimeout(() => {
        if (redirectPath?.includes('/interview/review') && jobId) {
          router.push(`/interview/review/${jobId}`);
        } else if (redirectPath === '/login' || redirectPath === '/') {
          router.push('/');
        } else if (redirectPath) {
          router.push(redirectPath);
        } else if (role === 'superadmin') {
          router.push('/admin/home');
        } else {
          router.push('/');
        }

        sessionStorage.removeItem('redirectPath');
      }, 200);
    }
  }, [pathname, searchParams, router]);
}
