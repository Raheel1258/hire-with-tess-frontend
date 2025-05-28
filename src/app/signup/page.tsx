'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useRef } from 'react';
import useHomeStore from '@/store/Employer/home.store';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import CustomInputForm from '../interview/component/customformInput';
import { Checkbox } from '@/components/ui/checkbox';
import useSignupMutation from '@/Routes/Client/hook/POST/SignUP.hook';
import { signupFormSchema } from '@/schema/signup.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
  const jobId = useHomeStore((state) => state.jobId);
  const router = useRouter();

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      organization: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const ref = useRef<HTMLFormElement>(null);
  const signupMutation = useSignupMutation();

  const onSubmit = async (data: z.infer<typeof signupFormSchema>) => {
    const payload = {
      first_name: data.firstname,
      last_name: data.lastname,
      organization_name: data.organization,
      email: data.email,
      password: data.password,
      confirm_password: data.confirmPassword,
      role: 'admin',
    };

    signupMutation.mutate(payload, {
      onSuccess: () => {
        form.reset();
        router.push(`/interview/review/${jobId}`);
      },
    });
  };

  return (
    <div className="py-4">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="font-[roboto] font-medium text-[20px] sm:text-[24px]  w-full sm:w-[607px]">
          Sign Up to Share Your AI-Generated Interview
        </h1>
        <p className="font-[roboto] font-[400] text-[14px] sm:text-[16px] leading-[24px] text-[#606778] mt-2 w-full sm:w-[642px]">
          Get started with a 60-day free trial - no credit required!
        </p>

        <Button
          onClick={() => {
            const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
            const REDIRECT_URI =
              process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI ||
              'http://localhost:3000/auth/callback';

            const googleAuthUrl =
              `https://accounts.google.com/o/oauth2/v2/auth?` +
              `client_id=${GOOGLE_CLIENT_ID}` +
              `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
              `&response_type=code` +
              `&scope=openid%20email%20profile` +
              `&access_type=offline` +
              `&prompt=consent`;

            sessionStorage.setItem(
              'redirectPath',
              window.location.pathname + window.location.search,
            );
            window.location.href = googleAuthUrl;
          }}
          className="w-max-2xl sm:w-[528px] h-[64px] border-r-[14px] rounded-[14px] border-[1px] mt-4 mb-4 font-[roboto] font-normal bg-transparent text-black
                  hover:bg-transparent border-gray-400 flex items-center justify-center gap-2"
        >
          <Image src="/images/google.png" alt="Google Icon" width={20} height={20} />
          Continue with Google
        </Button>
      </div>

      <div className="w-full mt-4">
        <div className="relative flex items-center justify-center w-full mt-2 mb-2">
          <hr className="w-full h-[1px] bg-[#CBCAD7] border-0 rounded-sm" />
          <div className="absolute px-4 font-openSans font-normal text-[18px] space-x-[28px] bg-white text-gray-600 left-1/2 transform -translate-x-1/2">
            Or
          </div>
        </div>
        <div className="w-full sm:flex-col px-4 mt-4">
          {/* <SignupForm /> */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              ref={ref}
              className="space-y-8 flex flex-col items-center overflow-auto max-h-[80vh] py-8" // Added padding-y
            >
              <div className="flex gap-4 items-start w-full mt-4 ">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <CustomInputForm
                          {...field}
                          name="firstname"
                          type="text"
                          label="First Name"
                          placeholder="John"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <CustomInputForm
                          {...field}
                          name="lastname"
                          type="text"
                          label="Last Name"
                          placeholder="Doe"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4 items-start w-full ">
                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <CustomInputForm
                          {...field}
                          name="organization"
                          label="Organization Name"
                          placeholder="King Palm"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <CustomInputForm
                          {...field}
                          name="email"
                          type="email"
                          label="Email"
                          placeholder="john.doe@gmail.com"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4 items-start w-full ">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <CustomInputForm
                          {...field}
                          name="password"
                          type="password"
                          label="Password"
                          placeholder="******"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <CustomInputForm
                          {...field}
                          name="confirmPassword"
                          type="password"
                          label="Confirm Password"
                          placeholder="******"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-start w-full gap-x-2">
                <Checkbox id="terms" required={true} />
                <label
                  htmlFor="terms"
                  className="text-sm font-openSans text-[16px] font-normal text-[#1B2559] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the Terms of Service and acknowledge you have read our
                  Privacy Policy
                </label>
              </div>

              <div className="flex justify-center w-full">
                <Button
                  type="submit"
                  className="w-full sm:w-[528px] h-[64px] leading-[20px] font-roboto cursor-pointer rounded-2xl max-w-[90%]"
                  disabled={signupMutation.isPending}
                >
                  {signupMutation.isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    'Sign Up to Continue'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <p className="text-sm text-gray-500 text-center">
          Already have an account?{' '}
          <Link
            href={`/login?returnTo=/interview/review/${jobId}`}
            className="text-[#F7941D]"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
