import { useQuery } from '@tanstack/react-query';
import { AdminNotification } from '../../../Api/employer.route';

interface UseProfileSuperAdminOptions {
  enabled?: boolean;
}

export default function UseAdminNotification(options?: UseProfileSuperAdminOptions) {
  return useQuery({
    queryKey: ['notification'],
    queryFn: AdminNotification,
    enabled: options?.enabled ?? true,
  });
}
