import { GetEmployerSubscription } from '@/Routes/Admin/Api/admin.route';
import { useQuery } from '@tanstack/react-query';

export default function UseSubscriptionStats() {
  return useQuery({
    queryKey: ['employersubscription'],
    queryFn: GetEmployerSubscription,
    refetchOnWindowFocus: true,
  });
}
