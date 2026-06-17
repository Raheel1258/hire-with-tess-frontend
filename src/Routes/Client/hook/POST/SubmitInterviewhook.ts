import { useMutation } from '@tanstack/react-query';
import { SubmitInterview } from '@/Routes/Client/Api/api.routes';
import { toast } from 'sonner';
import { SubmitInterviewPayload } from '@/Types/EmployerDashboard/useresponse';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { useResponseStore } from '@/store/candidate/responsestore';
import { useRecordingStore } from '@/store/candidate/Recording.store';
import { useAudioStore } from '@/store/candidate/audio.store';
import useCandidateInfoStore from '@/store/candidate/userinfo';

const clearInterviewSession = () => {
  useResponseStore.getState().completeInterview();
  useRecordingStore.getState().ResetRecording();
  useAudioStore.getState().ResetAudioStore();
  useCandidateInfoStore.getState().ResetUserInfoStore();
};

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
      clearInterviewSession();
      toast.success('Interview submitted successfully');
      router.replace('/interview/finished');
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
