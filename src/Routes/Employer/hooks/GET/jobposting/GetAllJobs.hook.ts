import { useQuery } from '@tanstack/react-query';
import { GetAllJob } from '../../../Api/employer.route';

export default function UseGetAllJob() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: GetAllJob,
    refetchOnWindowFocus: true,
    refetchInterval: 90000,
    refetchIntervalInBackground: false,
    staleTime: 0, // Consider data stale immediately
    gcTime: 0, // Don't keep data in cache
  });
}
