import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { UpdateInterviewStatusByID } from '../../Api/employer.route';

export default function UseUpdateInterviewStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ interview_id, status }: { interview_id: string; status: string }) =>
      UpdateInterviewStatusByID(interview_id, status),
    onSuccess: (_, { interview_id }) => {
      queryClient.invalidateQueries({ queryKey: ['interview', interview_id] });
    },
    onError: () => {
      toast.error('Unable to update status');
    },
  });
}
