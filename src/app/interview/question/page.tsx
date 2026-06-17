'use client';
import useStore from '@/store/Employer/home.store';
import InterviewLayout from '@/components/layout/InterviewLayout';
import NoQuestion from '../component/emptycard';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import GenerateQuestionResponse from '@/Routes/Client/hook/POST/GenerateQuestion.hook';
import Question from '../component/question';

export default function Questionaire() {
  const jobId = useStore((state) => state.jobId);

  const questionmutation = GenerateQuestionResponse();
  const response = questionmutation.data || [];

  const onSubmit = () => {
    if (!jobId) return;
    questionmutation.mutate({ job_id: jobId });
  };

  return (
    <div>
      <InterviewLayout showStepper={true} currentStep={2}>
        <div className="flex flex-col w-full h-full items-center text-center space-y-4">
          {response.length > 0 ? <Question questions={response} /> : <NoQuestion />}

          <div className="mt-auto flex justify-center w-full">
            {response.length > 0 ? (
              <Button
                onClick={onSubmit}
                className="bg-transparent text-black mt-8 border hover:border-white hover:text-white rounded-2xl"
                disabled={questionmutation.isPending}
              >
                {questionmutation.isPending ? 'Regenerating...' : 'Regenerate Response'}
              </Button>
            ) : (
              <Button
                className="flex items-center gap-2"
                type="button"
                onClick={onSubmit}
                disabled={!jobId || questionmutation.isPending}
              >
                <Image src="/images/Vector.png" alt="alt" width={20} height={20} />
                {questionmutation.isPending ? 'Generating...' : 'Generate'}
              </Button>
            )}
          </div>
        </div>
      </InterviewLayout>

      <div className="flex flex-row justify-end gap-1.5 mr-6">
        <Button variant="secondary" type="button">
          Cancel
        </Button>
        <Link href="/interview/review">
          <Button type="submit" disabled={!jobId}>
            Next Step
          </Button>
        </Link>
      </div>
    </div>
  );
}
