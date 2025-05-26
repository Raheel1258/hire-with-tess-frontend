import { useQuery } from '@tanstack/react-query';
import { GetJobDetails } from '@/Routes/Client/Api/api.routes';

export default function useFetchJobDetails(jobId?: string) {
  return useQuery({
    queryKey: ['jobDetails', jobId],
    queryFn: () => (jobId ? GetJobDetails(jobId) : Promise.reject('No job ID provided')),
    enabled: !!jobId,
    retry: 2,
  });
}
