import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateJobByID } from '../../Api/employer.route';
import { toast } from 'sonner';
import { UserJobResponse } from '@/Types/userJob';

export default function UseUpdateJobByID() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ job_id, data }: { job_id: string; data: UserJobResponse }) =>
      UpdateJobByID(job_id, data),

    onSuccess: (apiData, { job_id }) => {
      queryClient.setQueryData(['userjobid'], (userdata: UserJobResponse[] = []) =>
        userdata.map((job) => (job.job_id === job_id ? apiData : job)),
      );

      queryClient.invalidateQueries({ queryKey: ['userjobid'] });
    },

    onError: () => {
      toast.error('There was a problem with your request.');
    },
  });
}
