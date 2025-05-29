import { useQuery } from '@tanstack/react-query';
import { GetAllJob } from '../../../Api/employer.route';

interface UseGetAllJobProps {
  page?: number;
  limit?: number;
}

export default function UseGetAllJob({ page = 1, limit = 10 }: UseGetAllJobProps = {}) {
  return useQuery({
    queryKey: ['jobs', page, limit],
    queryFn: () => GetAllJob(page, limit),
    refetchOnWindowFocus: true,
    refetchInterval: 90000,
    refetchIntervalInBackground: false,
    staleTime: 0, // Consider data stale immediately
    gcTime: 0, // Don't keep data in cache
  });
}
