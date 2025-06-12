import React, { useState } from 'react'

import Waveform from '@/app/interview/component/Waveform';
import InputBox from './fieldbox';
import { CandidateAnswersProps } from '@/Types/EmployerDashboard/Dashboard/jobposted/postedjob';
import { CirclePlay } from 'lucide-react';

interface AudiVideodialogueProps {
    answer: CandidateAnswersProps;
    index?: number;
    question: string;
    submission_type: string;
    url: string;
    temp_url?: string;
}

export default function AudiVideodialogue ({answer}: {answer: AudiVideodialogueProps}) {
    const [openVideoURL, setOpenVideoURL] = useState<string | null>(null);
    return (
        <InputBox key={index} label={`Question ${index + 1}`}>
          <p className="w-full font-normal text-[14px]">{question}</p>
          <div className="rounded-full p-3 border mt-6 w-full">

            <div className="flex items-center gap-2 ">
              {answer?.submission_type === 'audio' && (
                <Waveform recordedVoiceURL={answer.url} />
              )}
              {answer?.submission_type === 'video' && (
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

            </div>
          </div>
        </InputBox>
      );
}

