import { useQuery } from '@tanstack/react-query';
import { GetAllInterview } from '../../../Api/employer.route';

interface UseGetAllInterviewProps {
  page?: number;
  limit?: number;
}

export default function UseGetAllInterview({
  page = 1,
  limit = 10,
}: UseGetAllInterviewProps = {}) {
  return useQuery({
    queryKey: ['interviews', page, limit],
    queryFn: () => GetAllInterview(page, limit),
    refetchOnWindowFocus: true,
    refetchInterval: 90000,
    refetchIntervalInBackground: false,

  });
}
