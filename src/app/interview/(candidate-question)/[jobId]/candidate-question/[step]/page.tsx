'use client';

import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useEffect } from 'react';

import FetchQuestions from '@/Routes/Client/hook/GET/FetchQuestions.hook';
import Stepper from '@/app/interview/component/stepper';
import SpeechRecordingInput from '@/app/interview/component/SpeechToTextInput';
import { Skeleton } from '@/components/ui/skeleton';
import { useRecordingStore } from '@/store/candidate/Recording.store';
import { useResponseStore } from '@/store/candidate/responsestore';

export default function InterviewQuestionPage() {
  const params = useParams();
  const router = useRouter();

  const jobId = params?.jobId as string;
  const stepParam = params?.step as string;
  const currentStep = parseInt(stepParam || '1', 10);

  const { data } = FetchQuestions(jobId);
  const totalSteps = data?.questions?.length ?? 0;
  const currentQuestion = data?.questions?.[currentStep - 1];
  const savedCount = useResponseStore((state) => state.savedResponses.length);
  const interviewSubmitted = useResponseStore((state) => state.interviewSubmitted);
  const allowedStep = savedCount + 1;
  const isStepAllowed =
    !interviewSubmitted &&
    totalSteps > 0 &&
    savedCount < totalSteps &&
    currentStep === allowedStep;

  const handleSaveAndContinue = () => {
    const nextStep = currentStep + 1;

    if (nextStep <= totalSteps) {
      router.replace(`/interview/${jobId}/candidate-question/${nextStep}`);
    } else {
      toast.success('You have completed all the questions!');
      router.replace(`/interview/${jobId}/answered-questions`);
    }
  };

  useEffect(() => {
    if (interviewSubmitted) {
      router.replace('/interview/finished');
      return;
    }

    if (totalSteps === 0) return;

    if (savedCount >= totalSteps) {
      router.replace(`/interview/${jobId}/answered-questions`);
      return;
    }

    if (currentStep !== allowedStep) {
      router.replace(`/interview/${jobId}/candidate-question/${allowedStep}`);
    }
  }, [allowedStep, currentStep, interviewSubmitted, jobId, router, savedCount, totalSteps]);

  useEffect(() => {
    if (currentQuestion?.text) {
      useRecordingStore.getState().setCurrentQuestion(currentQuestion.text);
    }
  }, [currentQuestion]);

  if (!isStepAllowed) {
    return (
      <div className="min-h-screen flex flex-col items-center px-4 py-6 sm:p-6 w-full">
        <Skeleton className="w-full max-w-4xl h-10 mt-16" />
        <Skeleton className="w-full max-w-4xl h-6 mt-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6 sm:p-6 w-full">
      <h1 className="text-center text-xl sm:text-2xl md:text-[30px] mt-4 sm:mt-6 font-normal text-black leading-tight sm:leading-[28px]">
        Hirewithtess
      </h1>

      <div className="flex justify-center items-center my-6 sm:my-10 w-full max-w-4xl overflow-x-auto">
        {!data?.questions ? (
          <Skeleton className="w-full h-10" />
        ) : (
          <Stepper
            currentStep={currentStep}
            totalSteps={totalSteps}
            lineHeight={4}
          />
        )}
      </div>

      <div className="mb-6 flex flex-col items-center sm:items-start sm:text-left text-center gap-0.5 w-full max-w-4xl px-2 sm:px-0">
        {!currentQuestion ? (
          <Skeleton className="w-full h-6" />
        ) : (
          <>
            <p className="text-xs sm:text-sm font-medium mb-2">{`Question # ${currentStep}`}</p>
            <h2 className="text-base sm:text-lg font-bold mb-6 sm:mb-8 break-words w-full">{currentQuestion?.text}</h2>
          </>
        )}

        <SpeechRecordingInput
          key={currentStep}
          jobId={jobId}
          index={currentStep}
          onSaveAndContinue={handleSaveAndContinue}
        />
      </div>
    </div>
  );
}
