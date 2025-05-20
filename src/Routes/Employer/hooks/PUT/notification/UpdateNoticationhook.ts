import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { UpdateNotificationType } from '../../Api/employer.route';

export default function UseUpdateNotificationType() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ notification_type }: { notification_type: string }) =>
      UpdateNotificationType(notification_type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification'] });
    },
    onError: () => {
      toast.error('Unable to update notification type');
    },
  });
}
