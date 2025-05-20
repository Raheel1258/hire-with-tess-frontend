import { useMutation } from '@tanstack/react-query';
import { SubmitInterview } from '@/Routes/Client/Api/api.routes';
import { toast } from 'sonner';
import { SubmitInterviewPayload } from '@/Types/Employer/useresponse';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

export default function useSubmitInterview() {
  const router = useRouter();
  return useMutation({
    mutationFn: ({
      interview_id,
      data,
    }: {
      interview_id: string;
      data: SubmitInterviewPayload;
    }) => SubmitInterview(interview_id, data),
    onSuccess: () => {
      toast.success('Interview submitted successfully');
      router.push("/interview/finished")
    },
        onError: (error) => {
              const axiosError = error as AxiosError<{ detail: string }>;
              toast.error('Failed to submit interview', {
                description:
                  axiosError.response?.data?.detail || 'An error occurred during Interview Submission.',
              });
            },
  });
}
