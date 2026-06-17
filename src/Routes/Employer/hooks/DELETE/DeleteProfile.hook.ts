import { useMutation } from '@tanstack/react-query';
import { DeleteProfile } from '../../Api/employer.route';
import { toast } from 'sonner';
import { logoutAndRedirect } from '@/Utils/Providers/auth';

export default function UseDeleteProfile() {
  return useMutation({
    mutationFn: DeleteProfile,
    onSuccess: () => {
      toast.success('Profile deleted successfully');
      logoutAndRedirect();
    },
    onError: (error) => {
      toast.error('Unable to delete profile');
      console.log(error);
    },
  });
}
