'use client';
import UseProfileInfo from '@/Routes/Admin/hook/GET/Profileinfo.hook';
import UseUpdateProfileHook from '@/Routes/Admin/hook/PUT/Updateprofilehook';
import CustomInputForm from '@/app/interview/component/customformInput';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Pencil } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  AccountDetailformSchema,
  AccountFormValidator,
} from '@/schema/accountDetail.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function UserAccountDetail() {
  const { data: profileInfo } = UseProfileInfo();
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const UpdateProfileMutation = UseUpdateProfileHook();

  const form = useForm<AccountFormValidator>({
    resolver: zodResolver(AccountDetailformSchema),
    defaultValues: {
      firstname: profileInfo?.first_name || '',
      lastname: profileInfo?.last_name || '',
      organization: profileInfo?.organization_name || '',
      email: profileInfo?.email || '',
      image: undefined,
    },
  });

  useEffect(() => {
    if (profileInfo) {
      form.reset({
        firstname: profileInfo.first_name || '',
        lastname: profileInfo.last_name || '',
        organization: profileInfo.organization_name || '',
        email: profileInfo.email || '',
        image: undefined,
      });
      if (profileInfo.image_url) {
        setPreviewUrl(profileInfo.image_url);
      }
    }
  }, [profileInfo]);

  const ref = useRef<HTMLFormElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('image', file);
      form.clearErrors('image');
      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: AccountFormValidator) => {
    const formData = new FormData();

    formData.append('first_name', data.firstname);
    formData.append('last_name', data.lastname);
    formData.append('organization_name', data.organization);
    formData.append('email', data.email);
    if (data.image instanceof File) {
      formData.append('image', data.image);
    }

    UpdateProfileMutation.mutate(formData);
  };

  return (
    <div>
      <h1 className="text-24 font-semibold">Account Details</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          ref={ref}
          className="space-y-8 flex flex-col overflow-auto max-h-[80vh] py-8"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="relative group">
              <Avatar
                className="w-32 h-32 border-4 border-[#F7941D] cursor-pointer"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                {previewUrl ? (
                  <AvatarImage src={previewUrl} alt="Profile" className="object-cover" />
                ) : (
                  <AvatarFallback className="text-2xl bg-[#F7941D] text-white">
                    {profileInfo?.first_name?.[0] || 'U'}
                  </AvatarFallback>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Pencil className="w-6 h-6 text-white" />
                </div>
              </Avatar>
            </div>

            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex gap-4 items-start w-3xl mt-4">
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

          <div className="flex gap-4 items-start w-3xl">
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

          <div className="flex">
            <Button
              type="submit"
              className="leading-[20px] font-roboto cursor-pointer"
              disabled={UpdateProfileMutation.isPending}
            >
              {UpdateProfileMutation.isPending ? 'Updating...' : 'Update Profile'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
