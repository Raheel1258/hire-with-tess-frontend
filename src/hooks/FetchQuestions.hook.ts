import { useQuery } from '@tanstack/react-query';
import { GetQuestionById } from '@/Routes/Client/Api/api.routes';

export default function FetchQuestions(jobId: string) {
  return useQuery({
    queryKey: ['questions', jobId],
    queryFn: () => GetQuestionById(jobId!),
    enabled: !!jobId,
    
  });
}
