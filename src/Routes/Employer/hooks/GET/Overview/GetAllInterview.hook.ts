import { useQuery } from '@tanstack/react-query';
import { GetAllInterview } from '../../../Api/employer.route';

export default function UseGetAllInterview() {
  return useQuery({
    queryKey: ['interviews'],
    queryFn: GetAllInterview,
    refetchOnWindowFocus: true,           // Refresh when tab becomes active
    refetchInterval: 90000,               // Poll every 10s (suitable for dashboard)
    refetchIntervalInBackground: false, 
  });
}
