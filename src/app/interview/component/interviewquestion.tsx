'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import FetchQuestions from '@/hooks/FetchQuestions.hook';
import Stepper from '@/app/interview/component/stepper';
import SpeechRecordingInput from '@/app/interview/component/SpeechToTextInput';
import { Skeleton } from '@/components/ui/skeleton';

type InterviewQuestionPageProps = {
  useStepParamName?: string;
};

export default function InterviewQuestionPage({
  useStepParamName = 'step',
}: InterviewQuestionPageProps) {
  const params = useParams();
  const router = useRouter();

  const jobId = params?.jobId as string;
  const stepParam = params?.[useStepParamName] as string;
  const currentStep = parseInt(stepParam || '1', 10);

  const { data } = FetchQuestions(jobId);
  const totalSteps = data?.questions?.length ?? 0;
  const currentQuestion = data?.questions?.[currentStep - 1];

  const handleSaveAndContinue = () => {
    const nextStep = currentStep + 1;

    if (nextStep <= totalSteps) {
      router.push(`/interview/${jobId}/candidate-question/${nextStep}`);
    } else {
      toast.success('You have completed all the questions!');
      router.push(`/interview/${jobId}/answered-questions`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <h1 className="text-center text-[30px] mt-6 font-normal text-black leading-[28px] font-spaceGrotesk">
        Hirewithtess
      </h1>

      <div className="flex justify-between items-center my-10 w-full max-w-4xl">
        {!data?.questions ? (
          <Skeleton className="w-full h-10" />
        ) : (
          <Stepper
            currentStep={currentStep}
            totalSteps={totalSteps}
            circleSize={40}
            lineHeight={4}
            lineWidth={50}
          />
        )}
      </div>

      <div className="mb-6 flex flex-col items-center sm:items-start sm:text-left text-center gap-0.5 w-10/12">
        {!currentQuestion ? (
          <Skeleton className="w-full h-6" />
        ) : (
          <>
            <p className="text-sm font-medium mb-2">{`Question ${currentStep}`}</p>
            <h2 className="text-lg font-bold mb-8">{currentQuestion?.text}</h2>
            <p className="text-lg font-bold mb-8">type: {currentQuestion?.type}</p>
          </>
        )}

        <SpeechRecordingInput
          jobId={jobId}
          index={currentStep}
          onSaveAndContinue={handleSaveAndContinue}
        />
      </div>
    </div>
  );
}
