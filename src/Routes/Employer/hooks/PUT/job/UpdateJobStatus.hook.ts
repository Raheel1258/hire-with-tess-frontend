import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateJobStatusByID } from '../../Api/employer.route';
import { toast } from 'sonner';

export default function UseUpdateJobStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ job_id, status }: { job_id: string; status: string }) =>
      UpdateJobStatusByID(job_id, status),

    onSuccess: (_, { job_id }) => {
      queryClient.invalidateQueries({ queryKey: ['status', job_id] });
    },

    onError: () => {
      toast.error('Unable to update status');
    },
  });
}
