import { useQuery } from '@tanstack/react-query';
import { getSubscriptions } from '../../../Api/employer.route';
import { SubscriptionsResponse } from '../../../../../Types/Admin/subscription';

export default function useSubscriptions() {
  return useQuery<SubscriptionsResponse>({
    queryKey: ['subscriptions'],
    queryFn: getSubscriptions,
    refetchOnWindowFocus: true,       
    refetchInterval: 90000,         
    refetchIntervalInBackground: false, 
  });
} 