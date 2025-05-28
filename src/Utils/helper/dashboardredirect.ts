import { useRouter } from 'next/navigation';
import { getAuthToken } from '../Providers/auth';

import { getAuthRole } from '../Providers/auth';

import { toast } from 'sonner';

export function useDashboardRedirect(router: ReturnType<typeof useRouter>) {
  const token = getAuthToken();
  const role = getAuthRole();
  if (!token) {
    toast.error('You must be logged in');
    return;
  }
  if (role === 'admin') {
    router.push('/employer/home');
  } else if (role === 'superadmin') {
    router.push('/admin/home');
  } else {
    toast.error('Access denied');
  }
}
