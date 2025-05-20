import { GetSubscriptionFilter } from '@/Routes/Admin/Api/admin.route';
import { useQuery } from '@tanstack/react-query';

export default function UseSubscriptionStats() {
  return useQuery({
    queryKey: ['subscriptionfilter'],
    queryFn: GetSubscriptionFilter,
    refetchOnWindowFocus: true,
  });
}
