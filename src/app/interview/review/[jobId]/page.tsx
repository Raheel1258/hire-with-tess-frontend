'use client';
import InterviewLayout from '@/components/layout/InterviewLayout';
import { Button } from '@/components/ui/button';
import OutputCard from '@/app/interview/component/outputCard';
import FetchJobDetails from '@/hooks/FetchJobDetails.hook';
import FetchQuestions from '@/hooks/FetchQuestions.hook';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { customformSchema } from '@/schema/customform.schema';
import { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Signup from '@/app/signup/page';
import CustomInputForm from '@/app/interview/component/customformInput';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import EmployeeAuthStore from '@/store/Employee/auth.store';
import { getAuthCookie, getAuthToken } from '@/Utils/Providers/auth';
import useFetchInterviewLink from '@/hooks/FetchInterviewLink.hook';


export default function InterviewReview() {

  const params = useParams();
  const jobId = params?.jobId as string;

  const access_token = EmployeeAuthStore.getState().accessToken;

  const jobDetailsQuery = FetchJobDetails(jobId);

  const jobData = jobDetailsQuery?.data || {};
  const { data } = FetchQuestions(jobId);

  const form = useForm<z.infer<typeof customformSchema>>({});
  const { setValue } = form;

  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const accessToken = getAuthToken() || getAuthCookie();
  const { data: InterviewData } = useFetchInterviewLink(jobId);
 

  useEffect(() => {
    if (jobData) {
      setValue('jobTitle', jobData.job_title || '');
      setValue('jobType', jobData.job_type || '');
      setValue('companyName', jobData.company_name || '');
      setValue('location', jobData.location || '');
      setValue('salary', jobData.salary || '');
    }
  }, [jobData, setValue]);

  useEffect(() => {
    if (data?.questions) {
      data.questions.forEach((question: string, index: number) => {
        setValue(`questions.${index}`, question.text);
      });
    }
  }, [data?.questions, setValue]);


  return (
    <InterviewLayout
      subtitle="Review Your AI-Generated Interview"
      description="Take a final look before sharing it with candidates. You can edit or regenerate questions if needed."
      showStepper={true}
      currentStep={3}
      showGoogleLogin={false}
      useCard={false}
    >
      <div className="w-full p-6 mt-8">
        <Form {...form}>
          <form ref={ref} className="space-y-8">
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputForm
                      {...field}
                      name="jobTitle"
                      label="Job Title"
                      readOnly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputForm
                      {...field}
                      name="jobType"
                      label="Job Type"
                      readOnly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputForm
                      {...field}
                      name="companyName"
                      label="Company Name"
                      readOnly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputForm
                      {...field}
                      name="location"
                      label="Location"
                      readOnly
                    />
                  </FormControl>
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
                    currencyName={jobData.currency || 'currency'}
                    label="Salary"
                    type="number"
                    readOnly
                  />
                </FormItem>
              )}
            />
          </form>
        </Form>

        {Object.keys(jobData).length > 0 && (
          <div className="mt-4 w-full">
            <OutputCard
              containerPadding=""
              showHeading={false}
              showAvatar={false}
              showEditIcon={false}
              req={jobData.requirements || []}
              res={jobData.responsibilities || []}
              skill={jobData.skills || []}
            />
          </div>
        )}
        <div className="text-left space-y-2 w-full">
          <h2 className="text-lg font-semibold mt-4 mb-6">AI Powered Questions:</h2>
          <Form {...form}>
            <form>
              {data?.questions.map((question: string, index: number) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={`questions.${index}`}
                  render={({ field }) => (
                    <FormItem className="space-y-2 pt-2 pb-2">
                      <CustomInputForm
                        {...field}
                        name={`questions.${index}`}
                        label={`Question ${index + 1}`}
                        readOnly
                      />
                    </FormItem>
                  )}
                />
              ))}
            </form>
          </Form>
        </div>
        <div className="flex float-right gap-2 mt-8">
          <div>
            <Button onClick={() => router.back()} variant="secondary">
              Back
            </Button>
          </div>


          {accessToken ? (
            <Link href={`/interview/generate-link/${jobId}`}>
              <Button className="w-40">Generate Link</Button>
            </Link>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-40">Sign up to Continue</Button>
              </DialogTrigger>
              <DialogContent className="items-center bg-white shadow-2xl rounded-lg w-5xl">
                <DialogTitle></DialogTitle>
                <Signup />
              </DialogContent>
            </Dialog>
          )}



        </div>
      </div>
    </InterviewLayout>
  );
}
