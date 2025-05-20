'use client';

import { useRecordingStore } from '@/store/candidate/Recording.store';
import FetchQuestions from '@/hooks/FetchQuestions.hook';
import InterviewLayout from '@/components/layout/InterviewLayout';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Waveform from '@/app/interview/component/Waveform';
import { Check, CirclePlay, X } from 'lucide-react';
import EmojiRatingSlider from '@/app/interview/component/emojislider';
import { useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import useSubmitInterview from '@/Routes/Client/hook/POST/SubmitInterviewhook';
import { SubmitInterviewPayload } from '@/Types/Employer/useresponse';
import { useResponseStore } from '@/store/candidate/responsestore';
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import router from 'next/router';


export default function AnsweredQuestionList() {
  const params = useParams();
  const jobId = params?.jobId as string;

  const { data } = FetchQuestions(jobId);

  const interview_id = useRecordingStore((state) => state.interviewId);
  const savedResponses = useResponseStore((state) => state.savedResponses);

  const feedback = useRef<HTMLFormElement>(null);
  const { mutate, isPending, isError } = useSubmitInterview();
  const [openVideoURL, setOpenVideoURL] = useState<string | null>(null);


  const onSubmitFeedback = async () => {
    const form = feedback.current;
    if (form) {
      const formData = new FormData(form);
      const feedbackText = formData.get('feedback');
    }
  };

  const onSubmitInterview = async () => {
    const interviewId = useRecordingStore.getState().interviewId;

    if (!interviewId) {
      console.error('Interview ID is missing!');
      return;
    }

    if (!savedResponses.length) {
      console.warn('No saved responses found in localStorage.');
      return;
    }

    const questions_data = savedResponses.reduce((acc, item) => {
      acc[item.question_text] = item.temp_url;
      return acc;
    }, {} as Record<string, string>);

    const payload: SubmitInterviewPayload = {
      interview_id: interview_id,
      data: questions_data,
      onsuccess: () => {
        router.push('/interview/finished');
      }
    };

    mutate(payload);
  };

  return (
    <>
      <InterviewLayout
        useCard={false}
        showStepper={false}
        subtitle="Question Completed"
        description="Great job! Your responses have been recorded successfully"
      >
        <div>
          <div className="flex font-[roboto] text-[24px] font-semibold mb-6">
            Interview Questions
          </div>

          {data?.questions.map((question: any, index: number) => {
            const matchedResponse = savedResponses.find(
              (res) => res.question_text.trim().toLowerCase() === question.text.trim().toLowerCase()
            );

            const hasResponse = !!matchedResponse;

            return (
              <div key={index} className="mb-6 p-4 border rounded-md shadow">
                <div className="flex items-center gap-2 font-normal text-[14px] mb-2">
                  {hasResponse ? (
                    <Check className="w-5 h-5 text-[#f7941D]" />
                  ) : (
                    <X className="w-5 h-5 text-[#f7941D]" />
                  )}
                  <span>{question?.text}</span>
                </div>

                {hasResponse ? (
                  <div className="mb-4 space-y-2">
                    {matchedResponse.content_type.startsWith('audio') && (
                      <div className="rounded-full p-3 border">
                        <Waveform
                          recordedVoiceURL={matchedResponse.temp_url}
                          seconds={matchedResponse.length || 0}
                        />
                      </div>
                    )}
                    {matchedResponse.content_type.startsWith('video') && (
                      <div className="flex items-center justify-between p-4 border rounded-full">
                        <span className="text-sm font-medium text-[#1E4B8E] ">
                          Camera Recorded Video
                        </span>
                        <div
                          onClick={() => setOpenVideoURL(matchedResponse.temp_url)}
                        >
                         <CirclePlay className="w-10 h-8" color="#1e4b8e" /> 
                        </div>
                       
                      </div>
                    )}

                    {matchedResponse.content_type.startsWith('screen') && (
                      <div className="items-center justify-center flex p-4">
                        <video controls width={400} src={matchedResponse.temp_url} />
                      </div>
                    )}
                  </div>

                ) : (
                  <p className="text-sm italic text-gray-500 ml-7">
                    No response recorded.
                  </p>
                )}
              </div>
            );
          })}

          {isError && (
            <p className="text-red-500 text-sm mt-2">
              Something went wrong, please try again.
            </p>
          )}
          <Dialog open={!!openVideoURL} onOpenChange={() => setOpenVideoURL(null)}>
            <DialogContent className="max-w-3xl w-full p-0 overflow-hidden">
              {openVideoURL && (
                <video
                  src={openVideoURL}
                  controls
                  autoPlay
                  className="w-full h-auto rounded-md"
                />
              )}
            </DialogContent>

          </Dialog>

        </div>

        <Button onClick={onSubmitInterview} className="mt-4" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Save and Finish'}
        </Button>
      </InterviewLayout>

      <div className="flex flex-col items-center justify-center mt-10 text-center">
        <h1 className="font-[roboto] text-[#170F49] text-[34px] leading-[34px] font-bold">
          Help Us Improve Your Experience
        </h1>
        <p className="text-[#6F6C90] font-[roboto] text-[18px] font-normal leading-[30px] mt-4">
          Share your feedback on the interview process to help us enhance future experiences.
        </p>

        <EmojiRatingSlider />

        <form ref={feedback} className="items-center justify-center flex mt-4">
          <Textarea
            name="feedback"
            placeholder="What is the main reason for Your rating? (Optional)"
            className="w-xl h-40 rounded-xl"
          />
        </form>
        <Button onClick={onSubmitFeedback} className="mt-6">
          Submit Feedback
        </Button>
      </div>
    </>
  );
}
