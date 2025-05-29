import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AnalyzeInterview } from '@/Routes/Employer/Api/employer.route';

export default function AnalyzeInterviewHook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ interview_id }: { interview_id: string }) =>
      AnalyzeInterview(interview_id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interviews'] });
    },
  });
}
