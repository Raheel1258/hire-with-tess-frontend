import { usePathname } from 'next/navigation';

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
