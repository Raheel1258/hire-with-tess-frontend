import { useQuery } from '@tanstack/react-query';
import { JobCardStats } from '@/Routes/Employer/Api/employer.route';

export default function UseDashboardJobCardStats() {
  return useQuery({
    queryKey: ['jobstats'],
    queryFn: JobCardStats,
    refetchOnWindowFocus: true,          
    refetchInterval: 90000,              
    refetchIntervalInBackground: false,   
  });
}
