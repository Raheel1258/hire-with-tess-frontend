import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { GoogleLoginIn } from '@/Routes/Client/Api/api.routes';

export default function useGoogleLoginHook() {
  return useMutation({
    mutationFn: (code: string) => GoogleLoginIn(code),
    onSuccess: async () => {
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
