import { useMutation } from "@tanstack/react-query";
import { VerifyOTP } from "../../Api/employer.route";
import { toast } from "sonner";

export default function useVerifyOtp() {
  return useMutation({
    mutationFn: (data: {
      user_id: string;
      otp: string;
      new_password: string;
      confirm_password: string;
    }) => VerifyOTP(data),
    onSuccess: () => {
      toast.success("Password reset successfully");
    },
    onError: () => {
      toast.error("Failed to reset password");
    },
  });
}
