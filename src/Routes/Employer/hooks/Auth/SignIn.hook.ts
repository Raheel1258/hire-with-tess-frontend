import { EmployerLogin } from '@/Routes/Employer/Api/employer.route';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();

  return useMutation<LoginResponse, AxiosError<{ detail?: string }>, LoginPayload>({
    mutationFn: EmployerLogin,
    onSuccess: (data) => {
      const { access_token, role } = data;
      const returnTo = searchParams.get('returnTo');

      if (!access_token) {
        toast.error('You are not authenticated.');
        return;
      }

      setAuthToken(access_token, role);
      toast.success('Login successful');
      if (returnTo) {
        router.push(returnTo);
        return;
      }
      // role-based redirect
      switch (role) {
        case 'admin':
          router.push('/employer/home');
          break;
        case 'superadmin':
          router.push('/admin/home');
          break;
        default:
          toast.error('You are not allowed.');
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
