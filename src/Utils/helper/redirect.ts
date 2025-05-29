import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function UseSignUpRedirect(jobId?: string) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  useEffect(() => {
    if (pathname === '/') {
      router.push('/');
    }
    // else if (pathname === '/signup') {
    //   router.push('/login');
    // }
    else if (pathname === `/interview/review/${jobId}`) {
      router.push(`/interview/review/${jobId}`);
    } else if (returnTo) {
      router.push(returnTo);
    }
  }, [jobId, pathname, returnTo, router]);
}
