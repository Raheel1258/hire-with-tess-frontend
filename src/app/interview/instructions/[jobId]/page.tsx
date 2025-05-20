'use client';
import InterviewLayout from '@/components/layout/InterviewLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FetchQuestions from '@/hooks/FetchQuestions.hook';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CandidateInstructions() {
  const params = useParams();
  const jobId = params?.jobId as string | undefined;
  const { data } = FetchQuestions(jobId);

  return (
    <InterviewLayout
      showStepper={false}
      useCard={false}
      description="Let's get started. Record your response at your own pace and put your best foot forward!"
      subtitle="Your next opportunity starts here!"
      showTitle={true}
      subtitleClassName="font-roboto font-bold text-[34px] leading-[46px] mt-8"
      descriptionClassName="mt-4 text-[#6F6C90] leading-[30px] font-roboto font-normal"
    >
      <div className="flex flex-col items-center justify-center px-4 ">
        <h1 className="font-roboto font-bold text-[22px] sm:text-[26px] text-center">
          {data?.job_title} - {data?.company_name}
        </h1>
        <p className="font-roboto text-[14px] sm:text-[16px] font-normal text-[#6F6C90] mt-4 text-center">
          Take your time, be yourself, and show what you can do!
        </p>

        <div className="py-8 w-full flex justify-center">
          <Card className="w-full sm:w-[90%] md:w-[669px] border-1 rounded-2xl p-4">
            <h1 className="font-roboto font-bold text-[16px] leading-[20px] mb-2">
              Interview Instructions:
            </h1>
            <div className="list-disc pl-5 font-openSans text-[14px] leading-[26px] text-black">
              <li>You will answer few questions, each requiring an audio or video or screen sharing response.</li>
              <li>You can redo your responses before submitting your final answer.</li>
              <li>
                Each question has a time limit, so be mindful of your response time.
              </li>
              <li>
                Ensure a quiet environment and a stable internet connection for the best
                experience.
              </li>
              <li>Once you're ready, click "Continue" to begin!</li>
            </div>
          </Card>
        </div>

        <div className="py-8 w-full flex justify-center">
          <Link href={`/interview/details/${jobId}`}>
            <Button className="w-full sm:w-[351px] h-[50px] rounded-md">Continue</Button>
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
