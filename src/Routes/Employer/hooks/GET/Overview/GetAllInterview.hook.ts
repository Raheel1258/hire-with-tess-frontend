import { useQuery } from '@tanstack/react-query';
import { GetAllInterview } from '../../../Api/employer.route';

export default function UseGetAllInterview() {
  return useQuery({
    queryKey: ['interviews'],
    queryFn: GetAllInterview,
    refetchOnWindowFocus: true,
    refetchInterval: 10000,
  });
}
