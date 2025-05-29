import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateSuperAdminProfile } from '../../Api/admin.route';
import { toast } from 'sonner';

const UseUpdateProfileHook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UpdateSuperAdminProfile,
    onSuccess: () => {
      toast.success('Profile updated successfully');
      queryClient.invalidateQueries({ queryKey: ['adminProfile'] });
    },
  });
};

export default UseUpdateProfileHook;
