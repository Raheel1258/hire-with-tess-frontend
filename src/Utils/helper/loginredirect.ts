import { useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { getAuthToken, getAuthRole } from '../Providers/auth';
import { getValidReturnTo } from './authredirect';

export function useLoginRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = getAuthToken();
    const role = getAuthRole();
    const returnTo = getValidReturnTo(searchParams.get('returnTo'));

    if (pathname === '/login' && token) {
      if (returnTo) {
        router.push(returnTo);
      } else if (role === 'admin') {
        router.push('/');
      } else if (role === 'superadmin') {
        router.push('/admin/home');
      }
    }
  }, [pathname, searchParams, router]);
}
