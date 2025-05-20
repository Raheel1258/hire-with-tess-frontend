'use client';

import CustomInputForm from '@/app/interview/component/customformInput';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormField, FormItem } from '@/components/ui/form';
import LoginInMutation from '@/Routes/Employer/hooks/Auth/SignIn.hook';
import { signInFormSchema, SignInFormValidator } from '@/schema/signIn.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

export default function EmployeeSignIn() {
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
      <div className="w-full ">
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
                className="space-y-8 w-full max-w-2xl md:w-xl"
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
                    <Checkbox id="terms" required />
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
                    Forgot Password
                  </Link>
                </div>
                <div className="flex justify-center">
                  <Button
                    className="w-full sm:w-80 h-11 mt-4"
                    type="submit"
                    disabled={SignInMutation.isPending}
                  >
                    {SignInMutation.isPending ? 'Signing In...' : 'Sign In to Continue'}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
}
