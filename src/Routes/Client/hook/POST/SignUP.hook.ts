import { useMutation } from '@tanstack/react-query';
import { SignUp } from '@/Routes/Client/Api/api.routes';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { setAuthToken } from '@/Utils/Providers/auth';
import useHomeStore from '@/store/Employer/home.store';

export default function useSignupMutation(jobId?: string) {
  const router = useRouter();
  const { setCompanyName } = useHomeStore();

  const redirectTo =
    typeof window !== 'undefined' && window.location.search.includes('returnTo=')
      ? new URLSearchParams(window.location.search).get('returnTo')!
      : jobId
        ? `/interview/review/${jobId}`
        : '/';

  return useMutation({
    mutationFn: SignUp,

    onSuccess: async (response) => {
      if (response?.access_token) {
        setAuthToken(response.access_token, 'admin');
        setCompanyName(response.user.organization_name);
        toast.success('Signup successful!');
        router.push(redirectTo);
      } else {
        toast.error('Signup failed. No token received.');
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
