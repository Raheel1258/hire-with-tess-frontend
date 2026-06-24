import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { UpdateInterviewStatusByID } from '@/Routes/Employer/Api/employer.route';
import { AxiosError } from 'axios';
export default function UseUpdateInterviewStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ interview_id, status }: { interview_id: string; status: string }) =>
      UpdateInterviewStatusByID(interview_id, status),
    onSuccess: (_, { interview_id }) => {
      queryClient.invalidateQueries({ queryKey: ['interview', interview_id] });
      queryClient.invalidateQueries({ queryKey: ['interviews'] });
      queryClient.invalidateQueries({ queryKey: ['overiewstats'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['jobstats'] });
      queryClient.invalidateQueries({ queryKey: ['candidatestats'] });
      queryClient.invalidateQueries({ queryKey: ['analyses'] });
    },
    onError: async (error) => {
      const axiosError = error as AxiosError<{ detail: string }>;
      toast.error('Failed to update interview status', {
        description:
          axiosError.response?.data?.detail || 'An error occurred during interview status update.',
      });
    },
  });
}
