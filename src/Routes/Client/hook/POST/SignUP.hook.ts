import { useMutation } from '@tanstack/react-query';
import { SignUp } from '@/Routes/Client/Api/api.routes';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import useSignUpRedirect from '@/Utils/helper/redirect';
import { useRouter } from 'next/navigation';
import { setAuthToken } from '@/Utils/Providers/auth';
import useHomeStore from '@/store/Employer/home.store';

export default function useSignupMutation(jobId?: string) {
  const router = useRouter();
  const redirectTo = useSignUpRedirect(jobId);

  return useMutation({
    mutationFn: SignUp,

    onSuccess: async (response) => {
      try {
        if (response?.access_token) {
          setAuthToken(response.access_token, 'admin');
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
