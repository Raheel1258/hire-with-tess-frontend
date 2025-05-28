import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { GoogleLoginIn } from '@/Routes/Client/Api/api.routes';
import EmployeeAuthStore from '@/store/Auth/auth.store';

export default function useGoogleLoginHook() {
  const { setAccessToken } = EmployeeAuthStore();

  return useMutation({
    mutationFn: (code: string) => GoogleLoginIn(code),

    onSuccess: async (response) => {
      console.log(response, 'response');
      console.log('response.code', response?.data);
      try {
        if (!response?.access_token) {
          throw new Error('Invalid token');
        }

        setAccessToken(response.access_token);
        toast.success('Login Successful', {
          position: 'bottom-right',
        });
      } catch (error: any) {
        toast.error('Unexpected error during login', {
          position: 'bottom-right',
        });
      }
    },

    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'Login Failed';

      toast.error(errorMessage, {
        position: 'bottom-right',
      });
    },
  });
}
