'use client';
import Waveform from "@/app/interview/component/Waveform";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import InputBox from "./fieldbox";
import { Button } from "@/components/ui/button";
import Videopreviewdialogue from "./videopreviewdialogue";
import { CirclePlay } from "lucide-react";
import { useState } from "react";
import UseUpdateInterviewStatus from "@/Routes/Employer/hooks/PUT/overview/UpdateInterviewStatus.hook";
import  UserProfileProps  from "@/Types/EmployerDashboard/Dashboard/profile/userprofile.type";

export default function UserProfile({ data }:any) {

  const [openVideoURL, setOpenVideoURL] = useState<string | null>(null);

  if (!data) return null;
  const answers = data.answers;
  const questions = Object.keys(answers || {});
  const updatejobstatus = UseUpdateInterviewStatus();

  return (

    <>
      <Videopreviewdialogue
        videoURL={openVideoURL}
        onClose={() => setOpenVideoURL(null)}
      />
      <div>
        <div className="flex flex-col lg:flex-row w-full gap-4 p-4 mt-4">
          <Avatar className="w-24 h-24 lg:w-40 lg:h-40 sm:w-24 sm:h-24 self-center lg:self-start">
            {data.image_url ? (
              <AvatarImage src={data.image_url} alt={data.candidate_name} />
            ) : (
              <AvatarFallback>{data.candidate_name?.[0] || 'C'}</AvatarFallback>
            )}
          </Avatar>

          <Card className="w-full lg:w-3xl h-auto">
            <CardContent className="w-xl flex flex-col md:flex-row text-[#505050] justify-between gap-4 p-4">

              <div className="flex flex-col text-[14px] font-[roboto] font-bold gap-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                  <h1>Name:</h1>
                  <h1 className="font-normal sm:ml-2">{data.candidate_name}</h1>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                  <h1>Status:</h1>
                  <h1 className="font-normal sm:ml-2">{data.status}</h1>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                  <h1>AI Rating:</h1>
                  <h1 className="font-normal sm:ml-2">{data.ai_score }</h1>
                </div>
              </div>

              <div className="flex flex-col text-[14px] font-[roboto] font-bold gap-2">
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
              </div>
            </CardContent>
          </Card>


          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 items-center justify-center w-full px-4">
            <Button
              disabled={updatejobstatus.isPending}
              onClick={() => updatejobstatus.mutate({
                interview_id: data.id,
                status: "hire"
              })}
              className="w-full sm:w-1/2 lg:w-40 bg-[#1E4B8E] hover:bg-[#1E4B8E] cursor-pointer h-[50px] text-white"
            >
              Shortlisted
            </Button>
            <Button
              disabled={updatejobstatus.isPending}
              onClick={() => updatejobstatus.mutate(
                {
                  interview_id: data.id,
                  status: "reject"
                })}
              className="w-full sm:w-1/2 lg:w-40 bg-[#F55141] hover:bg-[#F55141] cursor-pointer h-[50px] text-white"
            >
              Reject
            </Button>
          </div>


        </div>

        <div className="p-4">
          <h1 className="font-[roboto] text-[20px] font-semibold leading-2">
            AI Powered Questions:
          </h1>
        </div>

        <div className="mt-4 p-4 space-y-4">
          {questions.map((question, index) => {
            const answer = answers[question];

            return (
              <InputBox key={index} label={`Question ${index + 1}`} >
                <p className="w-full font-normal text-[14px]">{question}</p>            
                <div className="rounded-full p-3 border mt-6 w-full">
                  <div className="flex items-center gap-2 ">
                    {answer?.type === 'audio' && (
                      <Waveform recordedVoiceURL={answer.url} />
                    )}
                    {answer?.type === 'video' && (
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
                    )}

                    {answer?.type === 'screen' && (
                      <div className="flex flex-row items-center justify-between p-2">
                        <span className="text-sm font-medium text-[#1E4B8E] ">
                          Screen Recorded Video
                        </span>
                        <div
                          onClick={() => setOpenVideoURL(answer.temp_url || answer.url)}
                        >
                          <CirclePlay className="w-10 h-8" color="#1e4b8e" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </InputBox>
            );
          })}

        </div>
      </div></>
  );
}
