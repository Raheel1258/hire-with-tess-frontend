import { DashboardCardStats } from '@/Routes/Employer/Api/employer.route';
import { useQuery } from '@tanstack/react-query';

export default function UseDashboardCardStats() {
  return useQuery({
    queryKey: ['overiewstats'],
    queryFn: DashboardCardStats,
    refetchOnWindowFocus: true,
    refetchInterval: 90000,
    refetchIntervalInBackground: false,
  });
}
