'use client';
import CustomInputForm from '@/app/interview/component/customformInput';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, Form } from '@/components/ui/form';
import { AccountDetailformSchema, AccountFormValidator, } from '@/schema/accountDetail.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import UseProfileInfo from '@/Routes/Employer/hooks/GET/profile/profileinfohook';
import RedirectToDashboard from '../components/breadcrumb';
import UseUpdateProfileHook from '@/Routes/Employer/hooks/PUT/profile/updateprofiehook';
import { UserPen } from 'lucide-react';
import { useSkillStore } from '@/store/Employee/InputStore';

export default function UserAccountDetail() {
  const { data: profileInfo } = UseProfileInfo();
  const UpdateProfileMutation = UseUpdateProfileHook();

  const { isEditable, setIsEditable } = useSkillStore();
  const profilediting=()=>{
    setIsEditable(true)
  }

  const form = useForm<AccountFormValidator>({
    resolver: zodResolver(AccountDetailformSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      organization: '',
      email: '',
    },
  });

  const ref = useRef<HTMLFormElement>(null);

  const onSubmit = async (data: AccountFormValidator) => {
    console.log("Function Called from Front end")
    UpdateProfileMutation.mutate({
      first_name: data.firstname,
      last_name: data.lastname,
      organization_name: data.organization,
      email: data.email,
    }, {
      onSuccess: () => {
        setIsEditable(false); 
      }
    });
  };
  

  const { setValue } = form;

  useEffect(() => {
    if (profileInfo) {
      setValue('firstname', profileInfo.first_name || '');
      setValue('lastname', profileInfo.last_name || '');
      setValue('organization', profileInfo.organization_name || '');
      setValue('email', profileInfo.email || '');
    }
  }, [profileInfo, setValue]);


  return (
    <div className="space-y-2">
      <RedirectToDashboard
        DashboardTitle="Dashboard"
        ProfileTitle="Profile"
        PageTitle="Account Details"
        DashboardUrl="/employer/home"
        ProfileUrl={'/employer/profile'} />
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold text-slate-800">Account Details</h1>
        <div onClick={profilediting} className="w-10 h-10 flex items-center justify-center rounded-full border">
          <UserPen className="w-5 h-5" />
        </div>
      </div>


      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          ref={ref}
          className="space-y-8 flex flex-col overflow-auto max-h-[80vh] py-8"
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
                      readOnly={!isEditable}
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
                      readOnly={!isEditable}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4 items-start  w-full ">
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
                      readOnly={!isEditable}
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
                      readOnly={!isEditable}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex ">
            <Button
              type="submit"
              className=" leading-[20px] font-roboto cursor-pointer "
              disabled={UpdateProfileMutation?.isPending}
            >
              {UpdateProfileMutation?.isPending ? 'Updating...' : 'Update Profile'}
            </Button>
            <Button
              type="reset"
              variant="ghost"
              className="leading-[20px] font-roboto cursor-pointer "
              onClick={() => form.reset()}
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}