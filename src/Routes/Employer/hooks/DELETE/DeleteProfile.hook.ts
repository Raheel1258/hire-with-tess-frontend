import { useMutation } from '@tanstack/react-query';
import { DeleteProfile } from '../../Api/employer.route';
import { toast } from 'sonner';
import router from 'next/router';

export default function UseDeleteProfile() {
  return useMutation({
    mutationFn: DeleteProfile,
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
      toast.success('Profile deleted successfully');
      router.push('/employer/login');
    },
    onError: (error) => {
      toast.error('Unable to delete profile');
      console.log(error);
    },
  });
}
