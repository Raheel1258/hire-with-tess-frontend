'use client';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import React, { useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { customformSchema, FormValidator } from '@/schema/customform.schema';
import useHomeStore from '@/store/Employer/home.store';
import Link from 'next/link';
import InterviewLayout from '@/components/layout/InterviewLayout';
import CustomInputForm from '@/app/interview/component/customformInput';
import { useParams } from 'next/navigation';
import { useUpdateJob } from '@/Routes/Client/hook/PUT/UpdateJobDetails.hook';
import { Loader2 } from 'lucide-react';


export default function InterviewForm() {
 
  const { jobTitle,jobDescription, jobType, companyName, location,salary } = useHomeStore();
  const { jobId } = useParams<{ jobId: string }>();
  const generateMutation = useUpdateJob();
  const { companyName: companyNameStore } = useHomeStore();

  const form = useForm<FormValidator>({
    resolver: zodResolver(customformSchema),
    defaultValues: {
      jobDescription: jobDescription,
      jobTitle: jobTitle || '',
      jobType: jobType,
      companyName: companyName || companyNameStore,
      location: location,
      salary: salary || '0',
      currency: 'USD',
      salaryType: 'per_hour',
    },
  });
  const ref = useRef<HTMLFormElement>(null);

  const onSubmit = async (data: FormValidator) => {
    generateMutation.mutate({
      job_description: data.jobDescription,
      job_title: data.jobTitle || '',
      job_type: data.jobType || '',
      company_name: data.companyName || '',
      location: data.location || '',
      salary: data.salary || '0',
      currency: data.currency || '',
      salary_type: data.salaryType || '',
    });
  };

  const handleReviewClick = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;

    const formData = form.getValues();
    generateMutation.mutate({
      job_description: formData.jobDescription,
      job_title: formData.jobTitle,
      job_type: formData.jobType,
      company_name: formData.companyName,
      location: formData.location,
      salary: formData.salary || '0',
      currency: formData.currency,
      salary_type: formData.salaryType,
    });
  };

  return (
    <>
      <InterviewLayout
        currentStep={3}
        description="Your AI-powered Job breakdown — sharp, clear, and ready to impress."
        showGoogleLogin={false}
        useCard={false}
        contentClassName="max-sm:px-3 max-sm:py-4 max-sm:overflow-x-clip"
      >
        <div className="w-full min-w-0 max-w-full pt-4 pb-4 text-center sm:pt-10 sm:pb-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              ref={ref}
              className="mx-auto w-full min-w-0 max-w-2xl space-y-6 px-0 sm:space-y-8 sm:px-4"
            >
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem className="w-full min-w-0 max-w-full">
                    <CustomInputForm
                      {...field}
                      name="jobTitle"
                      label="Job Title"
                      placeholder={jobTitle || 'Job Title here'}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobType"
                render={() => (
                  <FormItem className="w-full min-w-0 max-w-full">
                  <CustomInputForm
                    name="jobType"
                    label="Job Type"
                    jobTypeName="jobType"
                  />
                </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem className="w-full min-w-0 max-w-full">
                    <CustomInputForm
                      {...field}
                      name="companyName"
                      label="Organization Name"
                      placeholder="Organization Name here"
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="w-full min-w-0 max-w-full">
                    <CustomInputForm
                      {...field}
                      name="location"
                      label="Organization Location "
                      placeholder="Organization Location here"
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem className="w-full min-w-0 max-w-full">
                    <CustomInputForm
                      {...field}
                      name="salary"
                      label="Salary"
                      currencyName="currency"
                      salaryTypeName="salaryType"
                    />
                  </FormItem>
                )}
              />
              <div className="flex flex-col-reverse sm:flex-row justify-end items-stretch sm:items-center gap-3 sm:gap-4">
                <Link href={`/interview/generate-questions/${jobId}`} className="w-full sm:w-auto">
                  <Button
                    variant={'secondary'}
                    className="w-full sm:w-auto cursor-pointer"
                    type="button"
                  >
                    Back
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={generateMutation.isPending || !jobId}
                  onClick={handleReviewClick}
                  className="w-full sm:w-auto cursor-pointer"
                >
                  {generateMutation.isPending ?  <Loader2 className='animate-spin' /> : 'Review Details'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </InterviewLayout>
    </>
  );
}
