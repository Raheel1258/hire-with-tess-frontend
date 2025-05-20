'use client';
import { Card } from '@/components/ui/card';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import React, { useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { customformSchema, FormValidator } from '@/schema/customform.schema';
import Image from 'next/image';
import useHomeStore from '@/store/Employee/home.store';
import Link from 'next/link';
import OutputCard from './component/outputCard';
import NoQuestion from './component/emptycard';
import GenerateResponse from '@/hooks/GenerateResponse.hook';
import InterviewLayout from '@/components/layout/InterviewLayout';
import CustomInputForm from '@/app/interview/component/customformInput';
import { Check, Pencil } from 'lucide-react';
import { useSkillStore } from '@/store/Employee/InputStore';

export default function InterviewForm() {
  const { jobDescription, jobTitle, jobType, companyName, location, salary } =
    useHomeStore();
  const jobId = useHomeStore((state) => state.jobId);

  const { isEditDescription, setIsEditableDescription } = useSkillStore();
  const form = useForm<FormValidator>({
    resolver: zodResolver(customformSchema),
    defaultValues: {
      jobDescription: jobDescription || '',
      jobTitle: jobTitle || '',
      jobType: jobType || '',
      companyName: companyName || '',
      location: location || '',
      salary: salary || '',
    },
  });
  const ref = useRef<HTMLFormElement>(null);
  const generateMutation = GenerateResponse();

  const onSubmit = async (data: FormValidator) => {
    generateMutation.mutate({
      job_description: data.jobDescription,
      job_title: data.jobTitle,
      job_type: data.jobType,
      company_name: data.companyName,
      location: data.location,
      salary: data.salary,
      currency: data.currency,
    });
  };

  const responseData = generateMutation.data || null;

  const handleEditDescription = () => {
    setIsEditableDescription(true);
  };

  const UpdateJobDescription = () => {
    setIsEditableDescription(false);
  };

  return (
    <>
      <InterviewLayout showGoogleLogin={false} useCard={false}>
        <div className=" text-center pt-10 pb-10 w-full ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              ref={ref}
              className="space-y-8 px-4"
            >
              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <CustomInputForm
                      {...field}
                      name="jobDescription"
                      label="Position Overview"
                      type="textarea"
                      placeholder="Position Overview here"
                      readOnly={!isEditDescription}
                      icon={
                        isEditDescription ? (
                          <Check
                            size={16}
                            color="green"
                            strokeWidth={0.75}
                            style={{ cursor: 'pointer' }}
                            onClick={UpdateJobDescription}
                          />
                        ) : (
                          <Pencil
                            size={18}
                            color="#718096"
                            style={{ cursor: 'pointer' }}
                            onClick={handleEditDescription}
                          />
                        )
                      }
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <CustomInputForm
                      {...field}
                      name="jobTitle"
                      label="Job Title"
                      placeholder="Job Title here"
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <CustomInputForm
                    {...field}
                    name="jobType"
                    label="Job Type"
                    jobTypeName="jobType"
                  />
                )}
              />

              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <CustomInputForm
                      {...field}
                      name="companyName"
                      label="Company Name"
                      placeholder="Company Name here"
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <CustomInputForm
                      {...field}
                      name="location"
                      label="Location "
                      placeholder="Location here"
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salary"
                render={() => (
                  <FormItem>
                    <CustomInputForm
                      name="salary"
                      currencyName="currency"
                      label="Salary"
                      placeholder="Enter salary here"
                      type="number"
                    />
                  </FormItem>
                )}
              />

              <Button
                className="cursor-pointer"
                disabled={generateMutation.isPending}
                type="submit"
              >
                <Image src="/images/Vector.png" alt="alt" width={20} height={20} />
                {generateMutation.isPending ? 'Generating.....' : 'Generate'}
              </Button>
            </form>
          </Form>
        </div>
      </InterviewLayout>
      <div className=" sm:p-18 p-6 ">
        <Card className="  w-full rounded-4xl shadow-xl ">
          {responseData ? (
            <>
              <OutputCard
                req={responseData.requirements || []}
                res={responseData.responsibilities || []}
                skill={responseData.skills || []}
              />

              <div className="my-2 flex justify-center">
                <Button
                  disabled={generateMutation.isPending}
                  onClick={() => onSubmit(form.getValues())}
                  className="bg-transparent text-black hover:text-white  border border-gray-400 hover:border-none rounded-2xl flex items-center justify-center"
                >
                  {generateMutation.isPending
                    ? 'Regenerating.....'
                    : 'Regenerate response'}
                </Button>
              </div>
            </>
          ) : (
            <NoQuestion />
          )}
        </Card>
      </div>

      {responseData ? (
        <div className="flex justify-end mr-16  sm:justify-end items-center mt-6 mb-4 sm:mr-18 gap-4">
          <Link href="/">
            <Button
              variant={'secondary'}
              className=" sm:w-auto cursor-pointer"
              type="button"
            >
              Cancel
            </Button>
          </Link>
          <Link href={`/interview/generate-questions/${jobId}`}>
            <Button type="submit" className="w-full sm:w-auto cursor-pointer">
              Next Step
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex justify-end mr-16  sm:justify-end items-center mt-6 mb-4 sm:mr-18 gap-4"></div>
      )}
    </>
  );
}
