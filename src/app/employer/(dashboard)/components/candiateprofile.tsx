'use client';
import Waveform from '@/app/interview/component/Waveform';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import InputBox from './fieldbox';
import { Button } from '@/components/ui/button';
import Videopreviewdialogue from './videopreviewdialogue';
import { CirclePlay } from 'lucide-react';
import { useState } from 'react';
import UseUpdateInterviewStatus from '@/Routes/Employer/hooks/PUT/overview/UpdateInterviewStatus.hook';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import StatusBadge from './status.badge';


export default function UserProfile({ data, isSuperAdmin }: any) {
  // const [openVideoURL, setOpenVideoURL] = useState<string | null>(null);
  const [isShortlisting, setIsShortlisting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  if (!data) return null;
  const answers = data.answers;
  const questions = Object.keys(answers || {});
  const updatejobstatus = UseUpdateInterviewStatus();

  const handleStatusUpdate = async (status: 'shortlisted' | 'reject' | 'pending') => {
    try {
      if (status === 'shortlisted') {
        setIsShortlisting(true);
      } else if (status === 'pending') {
        setIsPending(true);
      } else {
        setIsRejecting(true);
      }

      await updatejobstatus.mutateAsync({
        interview_id: data.id,
        status: status,
      });
      toast.success(
        `Candidate ${status === 'shortlisted' ?
          'shortlisted' : status === 'pending' ?
            'pending' : 
            'rejected'} successfully`
      );

      await queryClient.invalidateQueries({ queryKey: ['interviews'] });
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      if (status === 'shortlisted') {
        setIsShortlisting(false);
      } else if (status === 'pending') {
        setIsPending(false);
      } else {
        setIsRejecting(false);
      }
    }
  };

  return (
    <>
      {/* <Videopreviewdialogue
        videoURL={openVideoURL}
        onClose={() => setOpenVideoURL(null)}
      /> */}
      <div>
        <div className="flex flex-col lg:flex-row w-full gap-4 p-4 mt-4">
          <Avatar className="w-24 h-24 lg:w-40 lg:h-40 self-center lg:self-start">
            {data.image_url ? (
              <AvatarImage src={data.image_url} alt={data.candidate_name} />
            ) : (
              <AvatarFallback>{data.candidate_name?.[0] || 'C'}</AvatarFallback>
            )}
          </Avatar>

          <Card className="flex-1 h-auto">
            <CardContent className="flex flex-col md:flex-row text-[#505050] justify-between gap-4 p-4">
              <div className="flex flex-col text-[14px] font-roboto font-bold gap-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                  <h1>Name:</h1>
                  <h1 className="font-normal sm:ml-2">{data.candidate_name}</h1>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                  <h1>Status:</h1>
                  <StatusBadge status={data.status} />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                  <h1>Email:</h1>
                  <h1 className="font-normal sm:ml-2">{data.email}</h1>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                  <h1>Caller ID:</h1>
                  <h1 className="font-normal sm:ml-2">{data.phone}</h1>
                </div>
              </div>

              <div className="flex flex-col text-[14px] font-roboto font-bold gap-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                  <h1>Applied For:</h1>
                  <h1 className="font-normal sm:ml-2 truncate">{data.job_title}</h1>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                  <h1>Interview Date:</h1>
                  <h1 className="font-normal sm:ml-2">
                    {new Date(data.created_at).toLocaleDateString()}
                  </h1>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                  <h1>AI Rating:</h1>
                  <h1 className="lowercase font-normal sm:ml-2">{data.ai_score !==null ? `${data.ai_score}%` : 'N/A'}</h1>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                  <h1>Callback Number:</h1>
                  <h1 className="font-normal sm:ml-2">{data.callback_number === null ? 'N/A' : data.callback_number}</h1>
                </div>
              </div>
            </CardContent>
          </Card>

          {!isSuperAdmin && (
            <div className="w-full lg:w-[180px] flex flex-col sm:flex-row lg:flex-col gap-4 items-center justify-center px-4">
              <Button
                disabled={isShortlisting || isRejecting}
                onClick={() => handleStatusUpdate('shortlisted')}
                className="w-full sm:w-1/2 lg:w-full bg-[#1E4B8E] hover:bg-[#1E4B8E] cursor-pointer h-[50px] text-white"
              >
                {isShortlisting ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  'Shortlisted'
                )}
              </Button>
              <Button
                disabled={isShortlisting || isRejecting}
                onClick={() => handleStatusUpdate('reject')}
                className="w-full sm:w-1/2 lg:w-full bg-[#F55141] hover:bg-[#F55141] cursor-pointer h-[50px] text-white"
              >
                {isRejecting ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  'Reject'
                )}
              </Button>
              <Button
                disabled={isShortlisting || isRejecting || isPending}
                onClick={() => handleStatusUpdate('pending')}
                className="w-full sm:w-1/2 lg:w-full bg-[#f7941D] hover:bg-[#f7941D] cursor-pointer h-[50px] text-white"
              >
                {isPending ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  'Pending'
                )}
              </Button>
            </div>
          )}
        </div>

        <div className="mt-4 p-4 space-y-4">
          {questions.map((question, index) => {
            const answer = answers[question];

            return (
              <InputBox key={index} label={`Question ${index + 1}`}>
                <p className="w-full font-semibold text-[14px] ">{question}</p>
                <div className="rounded-full p-3 border mt-6 w-full">

                  <div className="flex items-center gap-2 ">
                    {answer?.submission_type === 'audio' && (
                      <Waveform recordedVoiceURL={answer.url} />
                    )}
                    {/* {answer?.submission_type === 'video' && (
                      <div className="flex flex-row items-center justify-between w-full px-2 rounded">
                        <span className="text-sm font-medium text-[#1E4B8E]">
                          Camera Recorded Video
                        </span>
                        <div
                          onClick={() => setOpenVideoURL(answer.temp_url || answer.url)}
                          className="cursor-pointer"
                        >
                          <CirclePlay className="w-8 h-8" color="#1e4b8e" />
                        </div>
                      </div>
                      
                    )} */}
                  </div>
               
                </div>
                <div className='flex flex-col gap-2 mt-2'>
                  <p className='text-sm font-medium text-[#1E4B8E]'>Transcription:</p>
                  <p className='text-sm font-normal text-[#505050]'>{answer.transcription || 'Transcription not available'}</p>
                </div>
              </InputBox>
            );
          })}
        </div>
      </div>
    </>
  );
}
