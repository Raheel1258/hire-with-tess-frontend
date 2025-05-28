import { useMutation } from '@tanstack/react-query';
import { SignUp } from '@/Routes/Client/Api/api.routes';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import EmployeeAuthStore from '@/store/Auth/auth.store';
import useSignUpRedirect from '@/Utils/helper/redirect';
import { useRouter } from 'next/navigation';
import { setAuthToken } from '@/Utils/Providers/auth';

export default function useSignupMutation(jobId?: string) {
  const router = useRouter();
  const redirectTo = useSignUpRedirect(jobId);
  const { setAccessToken, setUserRole } = EmployeeAuthStore();

  return useMutation({
    mutationFn: SignUp,

    onSuccess: async (response) => {
      try {
        if (response?.access_token) {
          setAccessToken(response.access_token);
          setUserRole(response.role);
          setAuthToken(response.access_token, response.role);
          console.log('Signup success response:', response);
          console.log('Access token:', response.access_token);
          console.log('Role:', response.role);
          console.log('Redirecting to:', redirectTo);

          document.cookie = `accessToken=${response.access_token}; path=/`;
          toast.success('Signup successful!');
          router.push(redirectTo);
        } else {
          toast.error('Signup failed. No token received.');
        }
      } catch (err) {
        toast.error('An error occurred after signup.');
        console.error('Signup success handling error:', err);
      }
    },

    onError: async (error) => {
      const axiosError = error as AxiosError<{ detail: string }>;
      toast.error('Signup Failed', {
        description:
          axiosError.response?.data?.detail || 'An error occurred during signup.',
      });
    },
  });
}
