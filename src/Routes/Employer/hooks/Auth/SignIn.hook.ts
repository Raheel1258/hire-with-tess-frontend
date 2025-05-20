import { EmployerLogin } from '@/Routes/Employer/Api/employer.route';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { setAuthToken } from '@/Utils/Providers/auth';

interface LoginResponse {
  access_token: string;
  token_type: string;
}

export default function LoginInMutation() {
  const router = useRouter();

  return useMutation<LoginResponse, AxiosError, { email: string; password: string }>({
    mutationFn: ({ email, password }) => EmployerLogin({ email, password }),
    onSuccess: async (data) => {
      if (!data.access_token) {
        toast.error('You are Not Authenticated');
        return;
      }
      setAuthToken(data.access_token);
      toast.success('Sign in successful', {
        description: 'Welcome back!',
      });
      router.push('/employer/home');
    },    
    onError: (error) => {
      const axiosError = error as AxiosError<{ detail: string }>;
      toast.error('SignIn Failed', {
        description:
          axiosError.response?.data?.detail || 'An error occurred during signIn.',
      });
    },
  });
}
