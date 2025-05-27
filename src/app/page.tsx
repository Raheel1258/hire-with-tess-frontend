'use client';
import EmployerLayout from '@/components/layout/EmployerLayout';
import useHomeStore from '@/store/Employer/home.store';
import Placeholder from './interview/component/placeholder';
import React from 'react';
import useGenerateResponse from '@/Routes/Client/hook/POST/GenerateResponse.hook';

export default function Home() {
  const { jobDescription, setJobDescription } = useHomeStore();
  const generateMutation = useGenerateResponse();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobDescription(e.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!jobDescription.trim()) return;
    generateMutation.mutate({
      job_description: jobDescription,
    });
  };

  return (
    <EmployerLayout>
      <div className="max-w-3xl w-full px-4 md:px-6 lg:px-0 text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[60px] font-bold text-white mb-4 sm:mb-6 leading-tight text-center">
            Effortless Hiring with AI-Powered Assessments
          </h2>
        </div>

        <p className="text-black font-open-sans  text-center mb-12 mt-8 sm:mb-6 text-sm sm:text-base md:text-lg leading-relaxed">
          Easily generate a shareable link for candidates to complete their AI-powered
          interview anytime, anywhere. No scheduling required.
        </p>

        <div className="w-full max-w-2xl mx-auto">
          <Placeholder
            onChange={handleChange}
            onSubmit={onSubmit}
            isLoading={generateMutation.isPending}
          />
        </div>
      </div>
    </EmployerLayout>
  );
}
