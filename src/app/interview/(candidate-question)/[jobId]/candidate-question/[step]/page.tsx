'use client';

import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useEffect } from 'react';

import FetchQuestions from '@/Routes/Client/hook/GET/FetchQuestions.hook';
import Stepper from '@/app/interview/component/stepper';
import SpeechRecordingInput from '@/app/interview/component/SpeechToTextInput';
import { Skeleton } from '@/components/ui/skeleton';
import { useRecordingStore } from '@/store/candidate/Recording.store';

export default function InterviewQuestionPage() {
  const params = useParams();
  const router = useRouter();

  const jobId = params?.jobId as string;
  const stepParam = params?.step as string;
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

  useEffect(() => {
    if (currentQuestion?.text) {
      useRecordingStore.getState().setCurrentQuestion(currentQuestion.text);
    }
  }, [currentQuestion]);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6 sm:p-6 w-full">
      <h1 className="text-center text-xl sm:text-2xl md:text-[30px] mt-4 sm:mt-6 font-normal text-black leading-tight sm:leading-[28px] font-spaceGrotesk">
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
