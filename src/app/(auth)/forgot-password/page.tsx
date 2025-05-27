"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Mail } from "lucide-react";
import useForgotPassword from "@/Routes/Employer/hooks/POST/ForgotPassword.hook";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const forgotPasswordMutation = useForgotPassword();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    forgotPasswordMutation.mutate({ email });
    if (forgotPasswordMutation.isSuccess) {
      toast.success("Password reset link sent to your email");
      router.push("/verify-otp");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 pr-4 py-2 w-full border rounded-xl text-sm"
            />
          </div>
          <Button
            type="submit"
            className="w-full h-11 mt-4 cursor-pointer"
            disabled={forgotPasswordMutation.isPending}
          >
            {forgotPasswordMutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Send Reset Link"
            )}
            Send Reset Link
          </Button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">
          Enter your registered email address and we’ll send you a password
          reset link.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
