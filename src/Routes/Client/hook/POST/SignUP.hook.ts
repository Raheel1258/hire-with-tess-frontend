import { useMutation } from '@tanstack/react-query';
import { SignUp } from '@/Routes/Client/Api/api.routes';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { setAuthToken, setOrganizationName } from '@/Utils/Providers/auth';
import useHomeStore from '@/store/Employer/home.store';
import { getInterviewReviewPath, getValidReturnTo } from '@/Utils/helper/authredirect';

export default function useSignupMutation(jobId?: string) {
  const router = useRouter();
  const { setCompanyName } = useHomeStore();

  const redirectTo =
    typeof window !== 'undefined'
      ? getValidReturnTo(new URLSearchParams(window.location.search).get('returnTo')) ??
        getInterviewReviewPath(jobId) ??
        '/'
      : getInterviewReviewPath(jobId) ?? '/';

  return useMutation({
    mutationFn: SignUp,

    onSuccess: async (response) => {
      if (response?.access_token) {
        setAuthToken(response.access_token, 'admin');
        setCompanyName(response.user.organization_name);
        setOrganizationName(response.user.organization_name);
        toast.success('Welcome! Your account has been created successfully.',{
          duration: 3000,
          position: 'bottom-right',
        });
        router.push(redirectTo);
      }
    },

    onError: async (error) => {
      const axiosError = error as AxiosError<{ detail: string }>;
       toast.error('Failed to create account. Please try again', {
        duration: 3000,
        position: 'bottom-right',
        description:
          axiosError.response?.data?.detail || 'An error occurred during signup.',
      });
    },
  });
}
