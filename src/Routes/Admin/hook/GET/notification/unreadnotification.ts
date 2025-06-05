import { useQuery } from "@tanstack/react-query";
import { GetUnreadCount } from "@/Routes/Admin/Api/admin.route";

interface UseSuperAdminUnreadNotificationsOptions {
  enabled?: boolean;
}

export default function useSuperAdminUnreadNotifications(options?: UseSuperAdminUnreadNotificationsOptions) {
  return useQuery({
    queryKey: ["unread-notification"],
    queryFn: GetUnreadCount,
    enabled: options?.enabled ?? true,
  });


};