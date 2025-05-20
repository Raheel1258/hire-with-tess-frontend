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
  showTitle?: boolean;
  showStepper?: boolean;
  currentStep?: number;
  showGoogleLogin?: boolean;
  useCard?: boolean;
  buttons?: { label: string; onClick: () => void }[];
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
}

export default function InterviewLayout({
  children,
  title = 'Hirewithtess',
  subtitle = 'Create an AI-Powered Interview in Seconds',
  description = 'Enter the job details, and let AI generate tailored interview questions for you.',
  showTitle = true,
  showStepper = true,
  currentStep = 1,
  showGoogleLogin = false,
  useCard = true,
  buttons = [],
  titleClassName = 'text-center items-center justify-center text-[30px] mt-6 font-normal text-black leading-[28px] font-spaceGrotesk sm:font-spaceGrotesk sm:font-normal text-[20px] leading-[28px]',
  subtitleClassName = 'text-center text-[#170F49] items-center justify-center font-bold text-[34px] leading-[46px] mt-6 font-roboto sm:font-bold sm:text-[24px] sm:leading-[46px] font-roboto',
  descriptionClassName = 'text-center items-center justify-center text-[18px] font-normal text-[#6F6C90] font-openSans sm:font-roboto sm:font-normal sm:text-[16px] sm:leading-[30px]',
}: InterviewLayoutProps) {
  const Content = (
    <div className="w-full border-[1px] mt-6 rounded-[34px] md:p-8 flex flex-col justify-center text-center items-center sm:p-6  shadow-xl">
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
        <div className="flex justify-end gap-2 mt-6 w-full">
          {buttons.map((btn, index) => (
            <Button key={index} onClick={btn.onClick} className="w-40 cursor-pointer">
              {btn.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center px-6 md:px-20 py-4 text-center">
      <div>
        {showTitle && <h1 className={titleClassName}>{title}</h1>}
        <h2 className={subtitleClassName}>{subtitle}</h2>
        <p className={descriptionClassName}>{description}</p>
      </div>

      {showGoogleLogin && (
        <Button className="w-[528px] h-[64px] font-normal bg-transparent rounded-2xl mt-10 text-black hover:bg-transparent border-2 border-solid border-gray-500 flex items-center justify-center gap-2">
          <Image src="/images/google.png" alt="Google Icon" width={20} height={20} />
          Continue with Google
        </Button>
      )}

      {useCard ? <Card className="w-full mt-8">{Content}</Card> : Content}
    </div>
  );
}
