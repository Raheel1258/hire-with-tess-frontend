'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { signupFormSchema } from '@/schema/signup.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useSignupMutation from '@/hooks/SignUP.hook';
import { Button } from '@/components/ui/button';
import CustomInputForm from '@/app/interview/component/customformInput';


export default function SignupForm() {
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
      },
    });
  };

  return (
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
            I agree to the Terms of Service and acknowledge you have read our Privacy
            Policy
          </label>
        </div>

        <div className="flex justify-center w-full">
        <Button
            type="submit"
            className="w-full sm:w-[528px] h-[64px] leading-[20px] font-roboto cursor-pointer rounded-2xl max-w-[90%]"
            disabled={signupMutation.isPending}
          >
            {signupMutation.isPending ? 'Signing Up...' : 'Sign Up to Continue'}
          </Button>
         
        </div>
      </form>
    </Form>
  );
}
