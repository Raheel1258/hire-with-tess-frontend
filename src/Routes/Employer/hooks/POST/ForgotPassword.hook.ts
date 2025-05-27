import { useMutation } from '@tanstack/react-query';
import { ForgotPassword } from '../../Api/employer.route';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useForgotPasswordStore } from '@/store/Employer/forgotpassword.store';
export default function useForgotPassword() {
  const router = useRouter();
  const { setUserId } = useForgotPasswordStore();
  return useMutation({
    mutationFn: (data: { email: string }) => ForgotPassword(data),

    onSuccess: (data) => {
      setUserId(data.user_id);
      toast.success('Password reset link sent to your email');
      router.push('/verify-otp');
    },
    onError: () => {
      toast.error('Failed to send password reset link');
    },
  });
}
