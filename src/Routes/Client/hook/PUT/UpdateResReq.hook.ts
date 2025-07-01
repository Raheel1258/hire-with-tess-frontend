import { updateResReq } from '@/Routes/Client/Api/api.routes';
import useHomeStore from '@/store/Employer/home.store';
import UpdateResponse from '@/Types/Employer/Updateresponse';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
export default function useResReqSkillHook() {
  const { jobId } = useHomeStore();

  return useMutation({
    mutationFn: ({
      data,
    }: {
      data: UpdateResponse
    }) => updateResReq(jobId, data),
    onError: async (error) => {
      const axiosError = error as AxiosError<{ detail: string }>;
      toast.error('Failed to update response', {
        description:
          axiosError.response?.data?.detail || 'An error occurred during response update.',
      });
    },
  });
}
