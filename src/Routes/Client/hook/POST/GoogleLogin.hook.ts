import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { GoogleLoginIn } from '@/Routes/Client/Api/api.routes';
import EmployeeAuthStore from '@/store/Auth/auth.store';

export default function useGoogleLoginHook() {
  const { setAccessToken } = EmployeeAuthStore();
  return useMutation({
    mutationFn: (code: string) => GoogleLoginIn(code),
    onSuccess: async (response) => {
      setAccessToken(response.data.access_token);
      toast.success('Login Successful', {
        position: 'bottom-right',
      });
    },
    onError: () => {
      toast.error('Login Failed', {
        description: 'Something went wrong',
        position: 'bottom-right',
      });
    },
  });
}
