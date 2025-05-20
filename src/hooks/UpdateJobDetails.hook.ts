import { updateJobDetails } from '@/Routes/Client/Api/api.routes';
import { useMutation } from '@tanstack/react-query';
import useHomeStore from '@/store/Employee/home.store';

export const useUpdateJob = () => {
  const { jobId } = useHomeStore();

  return useMutation({
    mutationFn: ({ data }: { data: never }) => updateJobDetails(jobId, data),
  });
};
