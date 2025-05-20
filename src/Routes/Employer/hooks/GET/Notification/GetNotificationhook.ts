import { useQuery } from '@tanstack/react-query';
import { AdminNotification } from '../../../Api/employer.route';

export default function UseAdminNotification() {
  return useQuery({
    queryKey: ['notification'],
    queryFn: AdminNotification,
    enabled: true,
  });
}
