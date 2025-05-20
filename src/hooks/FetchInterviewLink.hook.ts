import { GenerateInterviewLink } from '@/Routes/Client/Api/api.routes';
import { useQuery } from '@tanstack/react-query';
import EmployeeAuthStore from '@/store/Employee/auth.store';

export default function useFetchInterviewLink(job_id: string) {
  const { accessToken } = EmployeeAuthStore();

  return useQuery({
    queryKey: ['interviewLink', job_id], 
    queryFn: () => GenerateInterviewLink(job_id),
    staleTime: Infinity, 
    retry: 2,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!job_id && !!accessToken,
  });
}