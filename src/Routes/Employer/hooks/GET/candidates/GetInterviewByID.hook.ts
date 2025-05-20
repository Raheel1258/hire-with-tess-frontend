import { useQuery } from '@tanstack/react-query';
import { GetInterviewById } from '../../Api/employer.route';

export default function UseGetInterviewByID(interview_id: string) {
  return useQuery({
    queryKey: ['interview', interview_id],
    queryFn: () => GetInterviewById(interview_id),
    enabled: !!interview_id,
  });
}
