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
        // 1. Specific job interview review page
        if (redirectPath?.includes('/interview/review') && jobId) {
          router.push(`/interview/review/${jobId}`);
        }
        // 2. Login or root should always go to /
        else if (redirectPath === '/login' || redirectPath === '/') {
          router.push('/');
        }
        // 3. Generic valid redirect
        else if (redirectPath) {
          router.push(redirectPath);
        }
        // 4. Fallback by role
        else if (role === 'superadmin') {
          router.push('/admin/home');
        } else {
          router.push('/'); // for admin or others
        }

        // Clean up
        sessionStorage.removeItem('redirectPath');
      }, 200);
    }
  }, [pathname, searchParams, router]);
}
