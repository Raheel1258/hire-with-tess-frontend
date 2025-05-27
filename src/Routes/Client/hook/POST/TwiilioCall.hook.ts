import { useMutation } from '@tanstack/react-query';
import { TwillioStartCall } from '@/Routes/Client/Api/api.routes';
import { toast } from 'sonner';

export default function UseTwilloHook() {
  return useMutation({
    mutationFn: ({
      job_id,
      interview_id,
      phone_number,
    }: {
      job_id: string;
      interview_id: string;
      phone_number: string;
    }) => TwillioStartCall(job_id, interview_id, phone_number),
    onSuccess: () => {
      toast.success('Interview started successfully');
    },
    onError: () => {
      toast.error('Failed to start interview');
    },
  });
}
