import { GetSubscriptionStats } from '@/Routes/Admin/Api/admin.route';
import { useQuery } from '@tanstack/react-query';

export default function UseSubscriptionStats() {
  return useQuery({
    queryKey: ['subscriptionstats'],
    queryFn: GetSubscriptionStats,
    refetchOnWindowFocus: true,
  });
}
