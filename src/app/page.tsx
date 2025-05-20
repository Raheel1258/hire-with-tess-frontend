'use client';

import EmployerLayout from '@/components/layout/EmployerLayout';
import useHomeStore from '@/store/Employee/home.store';
import { useRouter } from 'next/navigation';
import Placeholder from './interview/component/placeholder';
import React from 'react';

export default function Home() {
  const { jobDescription, setJobDescription } = useHomeStore();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobDescription(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!jobDescription.trim()) return;
    router.push('/interview');
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
            <Placeholder onChange={handleChange} onSubmit={onSubmit} />
          </div>
      </div>
    </EmployerLayout>
  );
}
