import { EmployerLogin } from '@/Routes/Employer/Api/employer.route';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { setAuthToken } from '@/Utils/Providers/auth';


interface LoginResponse {
  access_token: string;
  token_type: string;
  role: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export default function useLoginMutation() {
  const router = useRouter();

  return useMutation<LoginResponse, AxiosError<{ detail?: string }>, LoginPayload>({
    mutationFn: EmployerLogin,
    onSuccess: (data) => {
      const { access_token, role } = data;

      if (!access_token) {
        toast.error('You are not authenticated.');
        return;
      }
      setAuthToken(access_token,role);

      toast.success('Sign in successful', {
        description: 'Welcome to Dashboard!',
      });

      switch (role) {
        case 'admin':
          router.push('/employer/home');
          break;
        case 'superadmin':
          router.push('/admin/home');
          break;
        default:
          toast.error('Your are Not Allowed');
          break;
      }
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.detail || 'An unexpected error occurred during sign-in.';
      toast.error('Sign-in failed', { description: errorMessage });
    },
  });
}
