'use client';
import InterviewLayout from '@/components/layout/InterviewLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FetchQuestions from '@/Routes/Client/hook/GET/FetchQuestions.hook';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useResponseStore } from '@/store/candidate/responsestore';
import { useRecordingStore } from '@/store/candidate/Recording.store';
import useCandidateInfoStore from '@/store/candidate/userinfo';
import { useAudioStore } from '@/store/candidate/audio.store';

export default function CandidateInstructions() {
  const params = useParams();
  const jobId = params?.jobId as string | undefined;
  const { data } = FetchQuestions(jobId);

  const EmptyStore = () => {
    useResponseStore.getState().clearUserResponses();
    useRecordingStore.getState().ResetRecording();
    useAudioStore.getState().ResetAudioStore();
    useCandidateInfoStore.getState().ResetUserInfoStore();
  }

  return (
    <InterviewLayout
      showStepper={false}
      useCard={false}
      description="Let's get started. Record your response at your own pace and put your best foot forward!"
      subtitle="Your next opportunity starts here!"
      showTitle={true}
      subtitleClassName="font-roboto font-bold text-[34px] leading-[46px] mt-8"
      descriptionClassName="mt-4 text-[#6F6C90] leading-[30px] font-roboto font-normal"
      // jobTitle={data?.job_title}
      // jobCompany={data?.company_name}
      showJobTitleSeparator={true}
      
    >
      
      <div className="flex flex-col items-center justify-center px-4 ">
        <h1 className="font-roboto font-bold text-[22px] sm:text-[26px] text-center">
          {data?.job_title} - {data?.company_name}
        </h1>
        <p className="font-roboto text-[14px] sm:text-[16px] font-normal text-[#6F6C90] mt-4 text-center">
          Take your time, be yourself, and show what you can do!
        </p>

        {data?.status === "closed" && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 font-medium flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              This job posting is no longer accepting applications
            </p>
          </div>
        )}


        <div className="py-8 w-full flex justify-center items-center">
          <Card className="w-full sm:w-[90%] md:w-[669px] border-1 rounded-2xl p-4">
            <h1 className="font-roboto font-bold text-[16px] leading-[20px] mb-2 text-center">
              Interview Instructions:
            </h1>
            <ul className="list-disc pl-5 font-openSans text-[14px] leading-[26px] text-black text-left">
              <li>
                You will answer a few questions, each requiring an audio response.
              </li>
              <li>You can redo your responses before submitting your final answer.</li>
              <li>
                Each question has a time limit, so be mindful of your response time.
              </li>
              <li>
                Ensure a quiet environment and a stable internet connection for the best
                experience.
              </li>
              <li>Once you're ready, click "Continue" to begin!</li>
            </ul>
          </Card>
        </div>

        <div className="py-8 w-full flex justify-center">
          <Link href={`/interview/details/${jobId}`}>
          <Button 
              onClick={() => EmptyStore()}
              className="w-full sm:w-[351px] h-[50px] rounded-md"
              disabled={data?.status === "closed"}
            >
              {data?.status === "closed" ? "Job Closed" : "Continue"}
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-1 px-2 sm:px-0 text-center sm:text-left">
          <p className="font-openSans font-bold text-[14px] sm:text-[16px] text-[#6F6C90]">
            Tip:
          </p>
          <p className="font-openSans font-normal text-[14px] sm:text-[16px] text-[#6F6C90]">
            Speak clearly and naturally, as if you're having a conversation. Confidence
            goes a long way!
          </p>
        </div>
      </div>
    </InterviewLayout>
  );
}
