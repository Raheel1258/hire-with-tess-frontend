'use client';

import CustomInputForm from '@/app/interview/component/customformInput';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormField, FormItem } from '@/components/ui/form';
import LoginInMutation from '@/Routes/Employer/hooks/Auth/SignIn.hook';
import { signInFormSchema, SignInFormValidator } from '@/schema/signIn.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Suspense } from 'react';
import SignupDialogue from '@/app/interview/component/signupDialogue';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { GoogleLoginButton } from '@/app/interview/component/googleloginbtn';

function EmployeeSignIn() {

  const form = useForm<SignInFormValidator>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const SignInMutation = LoginInMutation();
  const ref = useRef<HTMLFormElement>(null);

  const onSubmit = async (data: SignInFormValidator) => {
    SignInMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="flex items-center justify-center p-2 sm:p-10 w-full">
      <div className="w-full items-center justify-center ">
        <Card className="items-center justify-center p-4 sm:p-8 ">
          <h1 className="text-center mb-2 text-xl sm:text-2xl font-normal">
            Hirewithtess
          </h1>
          <h1 className="font-[roboto] font-medium text-2xl text-center">
            Sign In to your Account
          </h1>
          <p className="text-[#606778] text-lg font-semibold font-[roboto] text-center">
            Easily create interviews and manage candidates
          </p>

          <div className="mt-10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                ref={ref}
                className="space-y-6 w-full max-w-2xl md:w-xl"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <CustomInputForm
                        {...field}
                        name="email"
                        label="Email"
                        placeholder="Smith@gmail.com"
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <CustomInputForm
                        {...field}
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="********"
                      />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-openSans text-[12px] font-sm text-[#1B2559] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-[#F7941D] font-sm text-[12px] cursor-pointer hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Button
                  className="w-full h-11 cursor-pointer p-2 hover:bg-gray-100 hover:text-black"
                  type="submit"
                  disabled={SignInMutation.isPending}
                >
                  {SignInMutation.isPending ? (
                    <Loader2 className="animate-spin text-white" />
                  ) : (
                    'Sign In to Continue'
                  )}
                </Button>
              </form>
            </Form>
            {/* 
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <GoogleLoginButton redirectTo="/" />
              </div>
            </div> */}

            <p className="text-sm text-gray-500 text-center mt-4">
              Don&apos;t have an account?{' '}
              <Dialog>
                <DialogTrigger asChild>
                  <span className="bg-transparent text-[#F7941D] rounded-md hover:bg-transparent cursor-pointer">
                    Sign up
                  </span>
                </DialogTrigger>
                <DialogContent className="items-center bg-white shadow-2xl rounded-lg w-5xl">
                  <DialogTitle></DialogTitle>
                  <SignupDialogue />
                </DialogContent>
              </Dialog>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function EmployeeSignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmployeeSignIn />
    </Suspense>
  );
}
