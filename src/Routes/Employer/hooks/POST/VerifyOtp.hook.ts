import { useMutation } from '@tanstack/react-query';
import { VerifyOTP } from '../../Api/employer.route';
import { toast } from 'sonner';
import { useForgotPasswordStore } from '@/store/Employer/forgotpassword.store';
import { useRouter } from 'next/navigation';

export default function useVerifyOtp() {
  const router = useRouter();
  const { user_id } = useForgotPasswordStore.getState();
  return useMutation({
    mutationFn: (data: {
      otp: string;
      new_password: string;
      confirm_password: string;
    }) => {
      return VerifyOTP({ ...data, user_id });
    },
    onSuccess: () => {
      toast.success('Password reset successfully');
      router.push('/login');
    },
    onError: () => {
      toast.error('Failed to reset password');
    },
  });
}
