'use client';
import InterviewLayout from '@/components/layout/InterviewLayout';
import { Card } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import CustomInputForm from '@/app/interview/component/customformInput';
import React, { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CandidateDetailSchema,
  CandidateDetailsValidator,
} from '@/schema/CandidateDetail.schema';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { X } from 'lucide-react';
import RegeisterCandidatehook from '@/Routes/Client/hook/POST/RegeisterCandidatehook';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { useRecordingStore } from '@/store/candidate/Recording.store';

export default function CandidatesDetails() {
  const params = useParams();
  const jobId = params.jobId as string;

  const interview_id = useRecordingStore((state) => state.interviewId);

  const form = useForm<CandidateDetailsValidator>({
    resolver: zodResolver(CandidateDetailSchema),
    defaultValues: {
      candidate_name: '',
      email: '',
      phone: '',
      image: null as unknown as File,
      job_id: jobId,
    },
  });
  const UserImageRef = form.register('image');

  const mutation = RegeisterCandidatehook();

  const onSubmit = async (data: CandidateDetailsValidator) => {
    const formData = new FormData();
    formData.append('job_id', jobId);
    formData.append('candidate_name', data.candidate_name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('image', data.image);

    mutation.mutate(formData, {
      onSuccess: () => {
        toast.success(`${data.candidate_name} registered successfully`);
      },
    });
  };

  const ref = useRef<HTMLFormElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('image', file);
      form.clearErrors('image');
      setFileName(file.name);
    }
  };

  const removeFile = () => {
    setFileName(null);
    form.setValue('image', null as unknown as File);
    const input = document.getElementById('image-upload') as HTMLInputElement;
    if (input) input.value = '';
  };

  return (
    <InterviewLayout
      showStepper={false}
      useCard={false}
      subtitle="Fill In Your Details!"
      description="Please fill out your details before starting your Interview"
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} ref={ref} className="space-y-8 px-4">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="w-full h-full">
                <Card
                  className="border-dashed border-[#6F6C90] h-[159px] px-4 flex items-center justify-center relative cursor-pointer"
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  {fileName ? (
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md">
                        <span className="text-sm truncate max-w-[200px]">{fileName}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile();
                          }}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <FormLabel className="text-[#1E4B8E] border h-10 p-1 rounded ">
                      Upload Profile Picture
                    </FormLabel>
                  )}

                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    {...UserImageRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </Card>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="candidate_name"
            render={({ field }) => (
              <FormItem>
                <CustomInputForm {...field} label="Your Name" placeholder="Name" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <CustomInputForm {...field} label="Email" placeholder="Email" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <CustomInputForm
                  {...field}
                  label="Phone Number"
                  placeholder="+923000000000"
                />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full sm:w-[381px] h-[64px] leading-[20px] font-roboto cursor-pointer rounded-2xl max-w-[90%]"
            disabled={mutation.isPending}
          >
             {mutation.isPending ? 'Submitting...' : 'Start Interview'}
          </Button>
        </form>
      </FormProvider>
    </InterviewLayout>
  );
}
