import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { UpdateNotificationType } from '@/Routes/Employer/Api/employer.route';
import { AxiosError } from 'axios';

export default function UseUpdateNotificationType() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ notification_type }: { notification_type: string }) =>
      UpdateNotificationType(notification_type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification'] });
    },
    onError: async (error) => {
        const axiosError = error as AxiosError<{ detail: string }>;
        toast.error('Unable to update notification type', {
          description:
            axiosError.response?.data?.detail || 'An error occurred during notification type update.',
        });
    },
  });
}
