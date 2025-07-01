import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AnalyzeInterview } from '@/Routes/Employer/Api/employer.route';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
export default function AnalyzeInterviewHook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ interview_id }: { interview_id: string }) =>
      AnalyzeInterview(interview_id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interviews'] });
    },
    onError: async (error) => {
      const axiosError = error as AxiosError<{ detail: string }>;
      toast.error('Failed to analyze interview', {
        description:
          axiosError.response?.data?.detail || 'An error occurred during interview analysis.',
      });
    },
  });
}
