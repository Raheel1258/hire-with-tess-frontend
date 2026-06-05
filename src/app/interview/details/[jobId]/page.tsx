'use client';
import InterviewLayout from '@/components/layout/InterviewLayout';
import { Card } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import CustomInputForm from '@/app/interview/component/customformInput';
import React, { useEffect, useRef, useState } from 'react';
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
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function CandidatesDetails() {
  const { jobId } = useParams<{ jobId: string }>();

  const form = useForm<CandidateDetailsValidator>({
    resolver: zodResolver(CandidateDetailSchema),
    defaultValues: {
      candidate_name: '',
      email: '',
      callback_number: '',
      resume: undefined,
      job_id: jobId,
    },
  });

  const mutation = RegeisterCandidatehook();
  const onSubmit = async (data: CandidateDetailsValidator) => {
    const formData = new FormData();
    formData.append('job_id', jobId);
    formData.append('candidate_name', data.candidate_name);
    formData.append('email', data.email);
    formData.append('callback_number', data.callback_number);
    if (data.resume instanceof File) {
      formData.append('resume', data.resume);
    }
    mutation.mutate(formData, {
      onSuccess: () => {
        toast.success(`${data.candidate_name} registered successfully`);
      },
    });
  };

  const ref = useRef<HTMLFormElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const [defaultCountry, setDefaultCountry] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const providers: { url: string; pick: (d: any) => unknown }[] = [
      { url: 'https://ipwho.is/', pick: (d) => d?.country_code },
      { url: 'https://ipapi.co/json/', pick: (d) => d?.country_code },
      { url: 'https://get.geojs.io/v1/ip/country.json', pick: (d) => d?.country },
    ];

    const isValidCode = (code: unknown): code is string =>
      typeof code === 'string' && /^[A-Za-z]{2}$/.test(code);

    const detectCountry = async () => {
      for (const provider of providers) {
        try {
          const res = await fetch(provider.url);
          if (!res.ok) continue;
          const data = await res.json();
          const code = provider.pick(data);
          if (isValidCode(code)) {
            console.log('[region] detected country from', provider.url, '->', code);
            if (isMounted) setDefaultCountry(code.toLowerCase());
            return;
          }
        } catch {
          // try the next provider
        }
      }
      if (isMounted) setDefaultCountry('us');
    };

    detectCountry();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('resume', file);
      form.clearErrors('resume');
      setFileName(file.name);
    }
  };

  const removeFile = () => {
    setFileName(null);
    form.setValue('resume', undefined);
    const input = document.getElementById('image-upload') as HTMLInputElement;
    if (input) input.value = '';
  };

  return (
    <InterviewLayout
      showStepper={false}
      useCard={false}
      subtitle="Start Your Interview"
      description="Fill in your details to begin your interview"
      subtitleClassName="font-roboto font-bold text-2xl sm:text-[34px] leading-tight sm:leading-[46px] mt-4 sm:mt-6"
      descriptionClassName="mt-2 sm:mt-4 text-sm sm:text-base text-[#6F6C90] leading-relaxed sm:leading-[30px] font-roboto font-normal"
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} ref={ref} className="space-y-8 px-4">
          <FormField
            control={form.control}
            name="resume"
            render={() => (
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
                      Upload Resume
                    </FormLabel>
                  )}

                  <Input
                    id="image-upload"
                    type="file"
                    accept="application/pdf"
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
            name="callback_number"
            render={({ field }) => (
              <FormItem>
                {defaultCountry ? (
                  <PhoneInput
                    country={defaultCountry}
                    value={field.value}
                    onChange={(phone) => {
                      field.onChange(phone);
                    }}
                    inputProps={{
                      name: 'phone',
                      required: true,

                      placeholder: 'Enter phone number',
                    }}
                    inputStyle={{
                      width: '100%',
                      height: '60px',
                      fontWeight: 400,
                      color: 'black',
                      borderRadius: '14px',
                      border: '1px solid #d1d5db',
                      paddingLeft: '48px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                    }}
                    containerStyle={{
                      width: '100%',
                      position: 'relative',
                    }}
                    buttonStyle={{
                      borderRadius: '14px 0 0 14px',
                      borderRight: 'none',
                      border: '1px solid #d1d5db',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  />
                ) : (
                  <div
                    className="w-full animate-pulse rounded-[14px] border border-gray-300 bg-gray-50"
                    style={{ height: '60px' }}
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center w-full">
            <Button
              type="submit"
              className="w-full sm:w-[381px] h-12 sm:h-[64px] leading-[20px] font-roboto cursor-pointer rounded-2xl"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Submitting...' : 'Start Interview'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </InterviewLayout>
  );
}
