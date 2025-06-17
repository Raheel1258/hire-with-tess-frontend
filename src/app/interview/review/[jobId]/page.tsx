'use client';
import InterviewLayout from '@/components/layout/InterviewLayout';
import { Button } from '@/components/ui/button';
import OutputCard from '@/app/interview/component/outputCard';
import FetchJobDetails from '@/Routes/Client/hook/GET/FetchJobDetails.hook';
import FetchQuestions from '@/Routes/Client/hook/GET/FetchQuestions.hook';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { customformSchema } from '@/schema/customform.schema';
import { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import SignupDialogue from '@/app/interview/component/signupDialogue';
import CustomInputForm from '@/app/interview/component/customformInput';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getAuthCookie, getAuthToken } from '@/Utils/Providers/auth';
import useFetchInterviewLink from '@/Routes/Client/hook/POST/GenerateInterviewLink.hook';
import useHomeStore from '@/store/Employer/home.store';
import { DollarSign, Loader2 } from 'lucide-react';


export default function InterviewReview() {
  const { jobId } = useParams<{ jobId: string }>();
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const accessToken = getAuthToken() || getAuthCookie();
  const { mutate: fetchInterviewLink, isPending: isGeneratingLink } = useFetchInterviewLink(jobId);

  const jobDetailsQuery = FetchJobDetails(jobId);
  const jobData = jobDetailsQuery?.data || {};
  const { data } = FetchQuestions(jobId);

  const form = useForm<z.infer<typeof customformSchema>>({
    defaultValues: {
      salary: jobData?.salary || '',
      currency: jobData?.currency || 'USD',
      salaryType: jobData?.salary_type || 'per_hour',
      jobTitle: jobData?.job_title || '',
      jobType: jobData?.job_type || '',
      companyName: jobData?.company_name || '',
      location: jobData?.location || '',
    }
  });
  const { setValue } = form;
  const setJobId = useHomeStore((state) => state.setJobId);  

  useEffect(() => {
    if (jobData) {
      setValue('jobTitle', jobData.job_title || '');
      setValue('jobType', jobData.job_type || '');
      setValue('companyName', jobData.company_name || '');
      setValue('location', jobData.location || '');
      setValue('currency', jobData.currency || 'USD');
      setValue('salaryType', jobData.salary_type || 'per_hour');
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
  useEffect(() => {
    if (jobId) {
      setJobId(jobId);
    }
  }, [jobId, setJobId]);

  return (
    <InterviewLayout
      subtitle="Review Your AI-Generated Interview"
      description="Take a final look before sharing it with candidates. You can edit or regenerate questions if needed."
      showStepper={true}
      currentStep={4}
      showGoogleLogin={false}
      useCard={false}
    >
      <div className="w-full p-6 mt-6">
        {/* <h1 className="text-lg font-openSans text-c text-black text-left font-semibold mb-6">AI Created Job Details: </h1> */}
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
                      label="Organization Name"
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
                      label="Organization Location"
                      readOnly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputForm
                      {...field}
                      name="salary"
                      label="Salary"
                      type="number"
                      readOnly
                      currencyName="currency"
                      salaryTypeName="salaryType"
                      placeholder={jobData.salary}
                      currencyValue={jobData.currency}
                      salaryTypeValue={jobData.salary_type}
                      icon={<DollarSign />}
                      onChange={(value) => {
                        const numericValue = value.replace(/,/g, '');
                        field.onChange(numericValue);
                      }}
                      value={field.value ? field.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}
                    />
                  </FormControl>
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
            <Button
              onClick={() => {
                if (jobData.job_description) {
                  router.back();
                } else {
                  router.push(`/`);
                }
              }}
              variant="secondary"
            >
              Back
            </Button>
          </div>

          {accessToken ? (
            <Link href={`/interview/generate-link/${jobId}`}>
              <Button
                onClick={() => {
                  fetchInterviewLink();
                  router.push(`/interview/generate-link/${jobId}`);
                }}
                className="w-40"
              >
                {isGeneratingLink ? <Loader2 className='animate-spin' /> : 'Generate Link'}
              </Button>
            </Link>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-40">Sign up to Continue</Button>
              </DialogTrigger>
              <DialogContent className="items-center bg-white shadow-2xl rounded-lg w-5xl">
                <DialogTitle></DialogTitle>
                <SignupDialogue jobId={jobId} />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </InterviewLayout>
  );
}
