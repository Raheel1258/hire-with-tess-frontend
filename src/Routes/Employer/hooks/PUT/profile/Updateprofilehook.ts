import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateProfile } from '@/Routes/Employer/Api/employer.route';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
export default function UseUpdateProfileHook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UpdateProfile,
    onSuccess: () => {
      toast.success('Profile updated successfully');
      queryClient.invalidateQueries({ queryKey: ['profileinfo'] });
    },
    onError: async (error) => {
      const axiosError = error as AxiosError<{ detail: string }>;
      toast.error('Failed to update profile', {
        description:
          axiosError.response?.data?.detail || 'An error occurred during profile update.',
      });
    },
  });
}
