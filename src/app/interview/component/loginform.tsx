'use client';

import CustomInputForm from '@/app/interview/component/customformInput';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import useLoginMutation from '@/Routes/Employer/hooks/Auth/SignIn.hook';
import { signInFormSchema, SignInFormValidator } from '@/schema/signIn.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

interface LoginFormProps {
  jobId?: string;
  variant?: 'page' | 'dialog';
}

export default function LoginForm({ jobId, variant = 'page' }: LoginFormProps) {
  const isDialog = variant === 'dialog';
  const rememberMeCheckboxId = isDialog ? 'remember-me-dialog' : 'terms';

  const form = useForm<SignInFormValidator>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const ref = useRef<HTMLFormElement>(null);

  const signInMutation = useLoginMutation(jobId);

  const onSubmit = async (data: SignInFormValidator) => {
    signInMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  const renderField = (
    name: 'email' | 'password',
    label: string,
    type: string,
    placeholder: string,
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={isDialog ? 'w-full' : undefined}>
          {isDialog ? (
            <FormControl>
              <CustomInputForm
                {...field}
                name={name}
                label={label}
                type={type}
                placeholder={placeholder}
              />
            </FormControl>
          ) : (
            <CustomInputForm
              {...field}
              name={name}
              label={label}
              type={type}
              placeholder={placeholder}
            />
          )}
        </FormItem>
      )}
    />
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        ref={ref}
        className={
          isDialog
            ? 'flex w-full min-w-0 max-w-full flex-col items-stretch overflow-auto max-h-[80vh] space-y-4 max-sm:space-y-5 max-sm:py-4 max-sm:px-1 sm:items-center sm:space-y-6 sm:py-8'
            : 'space-y-6 w-full max-w-2xl md:w-xl'
        }
      >
        {renderField(
          'email',
          'Email',
          'email',
          isDialog ? 'john.doe@gmail.com' : 'Smith@gmail.com',
        )}
        {renderField(
          'password',
          'Password',
          'password',
          isDialog ? '******' : '********',
        )}

        <div
          className={
            isDialog
              ? 'flex w-full flex-row items-center justify-between gap-3 max-sm:pt-1 sm:gap-2'
              : 'flex w-full flex-col sm:flex-row justify-between items-center gap-2'
          }
        >
          <div className="flex items-center space-x-2 shrink-0">
            <Checkbox id={rememberMeCheckboxId} />
            <label
              htmlFor={rememberMeCheckboxId}
              className={
                isDialog
                  ? 'text-sm max-sm:text-xs sm:text-[16px] font-normal text-[#1B2559] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  : 'text-sm text-[12px] font-sm text-[#1B2559] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              }
            >
              Remember me
            </label>
          </div>
          <Link
            href="/forgot-password"
            className={
              isDialog
                ? 'shrink-0 text-[#F7941D] max-sm:text-xs sm:text-sm cursor-pointer hover:underline'
                : 'text-[#F7941D] font-sm text-[12px] cursor-pointer hover:underline'
            }
          >
            Forgot Password?
          </Link>
        </div>

        {isDialog ? (
          <div className="w-full max-sm:pt-2 sm:flex sm:justify-center">
            <Button
              className="w-full max-sm:mt-0 h-11 cursor-pointer p-2 hover:bg-gray-100 hover:text-black sm:mt-4 sm:w-3xs"
              type="submit"
              disabled={signInMutation.isPending}
            >
              {signInMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Log In to Continue'
              )}
            </Button>
          </div>
        ) : (
          <Button
            className="w-full h-11 cursor-pointer p-2 hover:bg-gray-100 hover:text-black"
            type="submit"
            disabled={signInMutation.isPending}
          >
            {signInMutation.isPending ? (
              <Loader2 className="animate-spin text-white" />
            ) : (
              'Sign In to Continue'
            )}
          </Button>
        )}
      </form>
    </Form>
  );
}
