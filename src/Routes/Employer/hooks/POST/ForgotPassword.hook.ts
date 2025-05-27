import { useMutation } from "@tanstack/react-query";
import { ForgotPassword } from "../../Api/employer.route";

export default function useForgotPassword() {
  return useMutation({
    mutationFn: (data: { email: string }) => ForgotPassword(data),
  });
}
