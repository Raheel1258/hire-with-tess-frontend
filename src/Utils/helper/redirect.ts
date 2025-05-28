import { usePathname, useRouter } from 'next/navigation';
import { getAuthRole, getAuthToken } from '../Providers/auth';

export default function useSignUpRedirect(jobId?: string) {
  const pathname = usePathname();
  let redirectTo = '/';

  if (pathname === '/') {
    redirectTo = '/';
  } else if (pathname === '/signup') {
    redirectTo = '/login';
  } else if (pathname === `/interview/review/${jobId}`) {
    redirectTo = `/interview/review/${jobId}`;
  }

  return redirectTo;
}

export function useLoginRedirect(jobId?: string) {
  const router = useRouter();
  const pathname = usePathname();
  if (pathname === '/login' && getAuthToken() && getAuthRole() === 'admin') {
    router.push('/');
  } else if (pathname === '/login' && getAuthToken() && getAuthRole() === 'superadmin') {
    router.push('/admin/home');
  } else if (pathname === '/login' && getAuthToken() && getAuthRole() === 'admin') {
    router.push(`/interview/review/${jobId}`);
  }
}
