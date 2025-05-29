import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateProfile } from '@/Routes/Employer/Api/employer.route';
import { toast } from 'sonner';

export default function UseUpdateProfileHook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UpdateProfile,
    onSuccess: () => {
      toast.success('Profile updated successfully');
      // Optionally, you can invalidate queries to refetch updated profile data
      queryClient.invalidateQueries({ queryKey: ['profileinfo'] });
    },
    onError: () => {
      toast.error('Failed to update profile');
    },
  });
}
