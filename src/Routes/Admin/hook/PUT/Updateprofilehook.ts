import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateSuperAdminProfile } from '../../Api/admin.route';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { setOrganizationName } from '@/Utils/Providers/auth';

const UseUpdateProfileHook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UpdateSuperAdminProfile,
    onSuccess: (_data, variables) => {
      if (variables instanceof FormData) {
        const orgName = variables.get('organization_name');
        if (typeof orgName === 'string') {
          setOrganizationName(orgName);
        }
      } else if (variables && typeof variables === 'object' && 'organization_name' in variables) {
        const orgName = (variables as { organization_name?: string }).organization_name;
        if (orgName) setOrganizationName(orgName);
      }
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
