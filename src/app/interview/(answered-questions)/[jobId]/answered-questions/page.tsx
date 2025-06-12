'use client';
import { useRecordingStore } from '@/store/candidate/Recording.store';
import FetchQuestions from '@/Routes/Client/hook/GET/FetchQuestions.hook';
import InterviewLayout from '@/components/layout/InterviewLayout';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Waveform from '@/app/interview/component/Waveform';
import { Check, CirclePlay, Loader2, X } from 'lucide-react';
import EmojiRatingSlider from '@/app/interview/component/emojislider';
import { useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import useSubmitInterview from '@/Routes/Client/hook/POST/SubmitInterviewhook';
import { SubmitInterviewPayload } from '@/Types/EmployerDashboard/useresponse';
import { useResponseStore } from '@/store/candidate/responsestore';
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import router from 'next/router';
import { useAudioStore } from '@/store/candidate/audio.store';
import useCandidateInfoStore from '@/store/candidate/userinfo';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

interface RecordingProps {
  seconds: number;
  temp_url: string;
  question_text: string;
  content_type: string;
}

export default function AnsweredQuestionList() {
  const { jobId } = useParams<{ jobId: string }>();

  const { data,isLoading } = FetchQuestions(jobId);
  const savedResponses = useResponseStore((state) => state.savedResponses);

  const {interviewId} = useRecordingStore();

  const feedback = useRef<HTMLFormElement>(null);
  const { mutate, isPending, isError } = useSubmitInterview();
  const [openVideoURL, setOpenVideoURL] = useState<string | null>(null);


  const EmptyStore = () => {
    useResponseStore.getState().clearUserResponses();
    useRecordingStore.getState().ResetRecording();
    useAudioStore.getState().ResetAudioStore();
    useCandidateInfoStore.getState().ResetUserInfoStore();
  }

  const onSubmitFeedback = async () => {
    const form = feedback.current;
    if (form) {
      const formData = new FormData(form);
      const feedbackText = formData.get('feedback');
    }
  };

  const onSubmitInterview = async () => {
    if (!interviewId) {
      toast.error('Interview ID is missing!')
      return;
    }

    if (!savedResponses.length) {
      toast.error('No saved responses found')
      return;
    }

    const questions_data = savedResponses.reduce((acc, item) => {
      acc[item.question_text] = item.temp_url;
      return acc;
    }, {} as Record<string, string>);

    const payload: SubmitInterviewPayload = {
      interview_id: interviewId,
      data: questions_data,
      onsuccess: () => {
        EmptyStore();
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

          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="mb-6 p-4 border rounded-md shadow">
                <div className="flex items-center gap-2 font-normal text-[14px] mb-2">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="mt-4">
                  <Skeleton className="h-12 w-full rounded-full" />
                </div>
              </div>
            ))
          ) : (
            data?.questions.map((question: any, index: number) => {
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
                      <X className="w-5 h-5 text-red-600" />
                    )}
                    <span>{question?.text}</span>
                  </div>

                  {hasResponse ? (
                    <div className="mb-4 space-y-2">
                      {matchedResponse.content_type.startsWith('audio') && (
                        <div className="rounded-full p-3 border">
                          <Waveform
                            recordedVoiceURL={matchedResponse.temp_url}
                          />
                        </div>
                  
                      )}
                      {/* {matchedResponse.content_type.startsWith('video') && (
                        <div className="flex items-center justify-between p-4 border rounded-full">
                          <span className="text-sm font-medium text-[#1E4B8E] ">
                            Screen Recorded Video
                          </span>
                          <div
                            onClick={() => setOpenVideoURL(matchedResponse.temp_url)}
                          >
                           <CirclePlay className="w-10 h-8" color="#1e4b8e" /> 
                          </div>
                        </div>
                      )} */}
                    </div>
                  ) 
                  : (
                    <p className="text-sm italic text-gray-500 ml-7">
                      No response recorded.
                    </p>
                  )}
                </div>
              );
            })
          )}

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

        <Button onClick={onSubmitInterview} className="mt-4 bg-green-400 text-white hover:bg-green-500" disabled={isPending}>
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save and Finish'}
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
