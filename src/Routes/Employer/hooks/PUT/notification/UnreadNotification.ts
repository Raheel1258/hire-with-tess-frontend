import { useQuery,  } from '@tanstack/react-query';
import { AdminUnreadNotification } from '@/Routes/Employer/Api/employer.route';

interface UseAdminUnreadNotificationsOptions {
  enabled?: boolean;
}

export default function useAdminUnreadNotifications(options?: UseAdminUnreadNotificationsOptions) {
  
  return useQuery({
    queryKey: ['unread-notification'],
    queryFn: AdminUnreadNotification,
    enabled: options?.enabled ?? true,
  }
);

} 