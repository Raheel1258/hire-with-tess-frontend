'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { KeyRound, ShieldCheck, Lock } from 'lucide-react';
import useVerifyOtp from '@/Routes/Employer/hooks/POST/VerifyOtp.hook';
import { toast } from 'sonner';
import { useForgotPasswordStore } from '@/store/Employer/forgotpassword.store';

const VerifyOtp = () => {
  const {
    otp,
    new_password,
    confirm_password,
    setNewPassword,
    setConfirmPassword,
    setOtp,
  } = useForgotPasswordStore();

  const verifyOtpMutation = useVerifyOtp();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (new_password !== confirm_password) {
      toast.error('Passwords do not match!');
      return;
    }
    verifyOtpMutation.mutate({
      otp: otp,
      new_password: new_password,
      confirm_password: confirm_password,
    });
    setNewPassword('');
    setConfirmPassword('');
    setOtp('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Verify OTP</h2>
        <p className="text-sm text-gray-500 text-center">
          Enter the OTP sent to your email and reset your password
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <KeyRound
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="pl-10 py-2 w-full border rounded-xl text-sm"
            />
          </div>

          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="password"
              placeholder="New Password"
              value={new_password}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="pl-10 py-2 w-full border rounded-xl text-sm"
            />
          </div>

          <div className="relative">
            <ShieldCheck
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="pl-10 py-2 w-full border rounded-xl text-sm"
            />
          </div>

          <Button type="submit" className="w-full  text-white py-2 rounded-xl">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
