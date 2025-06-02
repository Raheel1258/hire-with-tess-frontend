import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateSuperAdminProfile } from '../../Api/admin.route';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

const UseUpdateProfileHook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UpdateSuperAdminProfile,
    onSuccess: () => {
      toast.success('Profile updated successfully');
      queryClient.invalidateQueries({ queryKey: ['adminProfile'] });
    },
    onError: async (error) => {
      const axiosError = error as AxiosError<{ detail: string }>;
      toast.error('Failed to update profile', {
        description:
          axiosError.response?.data?.detail || 'An error occurred during profile update.',
      });
    },
  });
};

export default UseUpdateProfileHook;
