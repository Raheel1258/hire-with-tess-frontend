'use client';
import UseProfileInfo from '@/Routes/Admin/hook/GET/Profileinfo.hook';
import UseUpdateProfileHook from '@/Routes/Admin/hook/PUT/Updateprofilehook';
import CustomInputForm from '@/app/interview/component/customformInput';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, Form } from '@/components/ui/form';
import {
  AccountDetailformSchema,
  AccountFormValidator,
} from '@/schema/accountDetail.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

export default function UserAccountDetail() {
  const { data: profileInfo } = UseProfileInfo();
  const UpdateProfileMutation = UseUpdateProfileHook();

  const form = useForm<AccountFormValidator>({
    resolver: zodResolver(AccountDetailformSchema),
    defaultValues: {
      firstname: profileInfo?.first_name || '',
      lastname: profileInfo?.last_name || '',
      organization: profileInfo?.organization_name || '',
      email: profileInfo?.email || '',
    },
  });

  useEffect(() => {
    if (profileInfo) {
      form.reset({
        firstname: profileInfo.first_name || '',
        lastname: profileInfo.last_name || '',
        organization: profileInfo.organization_name || '',
        email: profileInfo.email || '',
      });
    }
  }, [profileInfo, form]);

  const ref = useRef<HTMLFormElement>(null);

  const onSubmit = async (data: AccountFormValidator) => {
    const formData = new FormData();
    formData.append('first_name', data.firstname);
    formData.append('last_name', data.lastname);
    formData.append('organization_name', data.organization);
    formData.append('email', data.email);

    UpdateProfileMutation.mutate(formData);
  };

  return (
    <div className="min-w-0 w-full space-y-4">
      <h1 className="text-xl font-semibold text-slate-800 sm:text-2xl">Account Details</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            ref={ref}
            className="flex w-full flex-col space-y-6"
          >
            <div className="flex w-full flex-col items-stretch gap-4 lg:flex-row lg:items-start">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem className="w-full min-w-0">
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
                  <FormItem className="w-full min-w-0">
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

            <div className="flex w-full flex-col items-stretch gap-4 lg:flex-row lg:items-start">
              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem className="w-full min-w-0">
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
                  <FormItem className="w-full min-w-0">
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

            <div className="flex w-full lg:w-auto">
              <Button
                type="submit"
                className="w-full cursor-pointer leading-[20px] lg:w-auto"
                disabled={UpdateProfileMutation.isPending}
              >
                {UpdateProfileMutation.isPending ? 'Updating...' : 'Update Profile'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
