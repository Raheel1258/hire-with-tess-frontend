import { useQuery } from '@tanstack/react-query';
import { getSubscriptionStats } from '../../../Api/employer.route';
import { SubscriptionStats } from '../../../../../Types/Admin/subscription';

export default function useSubscriptionStats() {
  return useQuery<SubscriptionStats>({
    queryKey: ['subscription-stats'],
    queryFn: getSubscriptionStats,
    refetchOnWindowFocus: true,
    refetchInterval: 90000,
    refetchIntervalInBackground: false,
  });
} 