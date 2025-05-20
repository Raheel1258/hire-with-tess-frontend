import { useMutation } from '@tanstack/react-query';
import { SignUp } from '@/Routes/Client/Api/api.routes';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import EmployeeAuthStore from '@/store/Employee/auth.store';


export default function useSignupMutation() {

  const { setAccessToken } = EmployeeAuthStore();
  const router = useRouter();
  const params = useParams();
  const jobId = params.jobId;

  return useMutation({
    mutationFn: SignUp,
    onSuccess: async (response) => {
      if (response?.access_token) {
        setAccessToken(response.access_token);
        document.cookie = `accessToken=${response.access_token}; path=/`;
        toast.success('Signup successful!');
        router.push(`/interview/generate-link/${jobId}`);
      } else {
        toast('Signup failed');
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
