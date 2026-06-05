import Stepper from '@/app/interview/component/stepper';
import { Card } from '../ui/card';
import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface InterviewLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  description?: string;
  jobTitle?: string;
  jobCompany?: string;

  showTitle?: boolean;
  showStepper?: boolean;
  currentStep?: number;
  showGoogleLogin?: boolean;
  useCard?: boolean;
  buttons?: { label: string; onClick: () => void }[];
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
  jobTitleClassName?: string;
  showJobTitleSeparator?: boolean;
}

export default function InterviewLayout({
  children,
  title = 'Hirewithtess',
  subtitle = 'Create an AI-Powered Interview in Seconds',
  description = 'Enter the job details, and let AI generate tailored interview questions for you.',
  jobTitle = '',
  jobCompany = '',
  showTitle = true,
  showStepper = true,
  currentStep = 1,
  showGoogleLogin = false,
  useCard = true,
  buttons = [],
  showJobTitleSeparator = false,
  titleClassName = 'text-center items-center justify-center text-xl sm:text-[30px] mt-4 sm:mt-6 font-normal text-black leading-tight sm:leading-[28px] font-spaceGrotesk',
  subtitleClassName = 'text-center text-[#170F49] items-center justify-center font-bold text-2xl sm:text-[34px] leading-tight sm:leading-[46px] mt-4 sm:mt-6 font-roboto',
  descriptionClassName = 'text-center items-center justify-center text-sm sm:text-[18px] font-normal text-[#6F6C90] leading-relaxed sm:leading-[30px] mt-2 sm:mt-0 font-openSans sm:font-roboto px-2 sm:px-0',
  jobTitleClassName = 'capitalize font-roboto font-bold text-xl sm:text-2xl text-center mt-4',
}: InterviewLayoutProps) {
  const Content = (
    <div className="w-full border-[1px] mt-4 sm:mt-6 rounded-2xl sm:rounded-[34px] p-4 sm:p-6 md:p-8 flex flex-col justify-center text-center items-center shadow-xl">
      {showStepper && (
        <div className="flex flex-col items-center w-full mt-2">
          <div className="flex flex-row justify-center w-full max-w-3xl">
            <Stepper currentStep={currentStep} />
          </div>
          <hr className="w-full border-t border-[#EFF0F6] mt-4" />
        </div>
      )}

      {/* Main Content */}
      <div className="w-full">{children}</div>

      {buttons.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6 w-full">
          {buttons.map((btn, index) => (
            <Button key={index} onClick={btn.onClick} className="w-full sm:w-40 cursor-pointer">
              {btn.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-20 py-4 text-center w-full">
      <div>
        {showTitle && <h1 className={titleClassName}>{title}</h1>}
        <span className={jobTitleClassName}>
          {jobTitle}
          {showJobTitleSeparator && jobTitle && jobCompany && ' - '}
          {jobCompany}
        </span>
        <h2 className={subtitleClassName}>{subtitle}</h2>
        <p className={descriptionClassName}>{description}</p>
      </div>

      {showGoogleLogin && (
        <Button className="w-full max-w-[528px] h-14 sm:h-[64px] font-normal bg-transparent rounded-2xl mt-6 sm:mt-10 text-black hover:bg-transparent border-2 border-solid border-gray-500 flex items-center justify-center gap-2">
          <Image src="/images/google.png" alt="Google Icon" width={20} height={20} />
          Continue with Google
        </Button>
      )}

      {useCard ? <Card className="w-full mt-8">{Content}</Card> : Content}
    </div>
  );
}
