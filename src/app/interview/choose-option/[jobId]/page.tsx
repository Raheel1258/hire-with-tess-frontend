'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Phone, MonitorSpeaker } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UseTwilloHook from '@/Routes/Client/hook/POST/TwiilioCall.hook';
import useCandidateInfoStore from '@/store/candidate/userinfo';

const ChooseInterviewOption = () => {
  const interviewId = useCandidateInfoStore((state) => state.interview_id);
  const phoneNumber = useCandidateInfoStore((state) => state.phone);
  const router = useRouter();
  const { jobId } = useParams<{ jobId: string }>();
  const twillioHook = UseTwilloHook();

  const handleWebInterview = () => {
    router.push(`/interview/${jobId}/candidate-question/1`);
  };

  const handlePhoneInterview = () => {
    router.push(`/interview/phone/${jobId}`);
  };

  const handleCallInterview = () => {
    twillioHook.mutate({
      job_id: jobId,
      interview_id: interviewId,
      phone_number: phoneNumber,
    });
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gray-50">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 text-center">
        Choose Your Interview Method
      </h1>
      <p className="text-gray-600 text-center text-lg sm:text-xl max-w-2xl mb-10">
        Select how you'd like to take your AI-powered interview. You can either answer
        questions directly on the web with audio and screen recording, or respond via a
        phone call.
      </p>

      <div className="flex flex-wrap justify-center gap-8 w-full max-w-7xl">
        {/* Web Interview Option */}
        <div className="w-[400px] p-6 border rounded-xl shadow-md bg-white hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-4">
            <MonitorSpeaker className="text-[#FF8C00]" size={28} />
            <h2 className="text-xl font-semibold text-gray-800">Web Interview</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Answer AI-prepared questions using your microphone and optional screen
            sharing. No video is required. You can record audio responses at your
            convenience.
          </p>
          <ul className="list-disc list-inside text-gray-500 mb-4">
            <li>Microphone response recording</li>
            <li>Optional screen sharing</li>
            <li>No webcam or video required</li>
            <li>Guided questions by AI</li>
          </ul>

          <Button
            onClick={handleWebInterview}
            className="mt-4 px-5 py-3 text-white font-semibold rounded-lg transition w-full"
          >
            Start Web Interview
          </Button>
        </div>

        {/* Phone Call Interview Option */}
        <div className="w-[400px] p-6 border rounded-xl shadow-md bg-white hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-4">
            <Phone className="text-[#FF8C00]" size={28} />
            <h2 className="text-xl font-semibold text-gray-800">Phone Call Interview</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Call the provided phone number and speak your <strong>Interview ID</strong> to
            begin. The AI will then ask you a series of questions. Ideal for those who
            prefer answering via phone.
          </p>

          <ul className="list-disc list-inside text-gray-500 mb-4">
            <li>Call a dedicated number</li>
            <li>Listen to AI questions</li>
            <li>Respond verbally via call</li>
            <li>Convenient & mobile-friendly</li>
          </ul>
          <Button
            onClick={handlePhoneInterview}
            className="mt-4 px-5 py-3 text-white font-semibold rounded-lg transition w-full"
          >
            Start Phone Interview
          </Button>
        </div>

        <div className="w-[400px] p-6 border rounded-xl shadow-md bg-white hover:shadow-lg transition flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Phone className="text-[#FF8C00]" size={28} />
              <h2 className="text-xl font-semibold text-gray-800">
                Start Call Interview
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Press the button below to directly call the HireWithTess interview number
              and begin your interview by providing your Interview ID.
            </p>
            <ul className="list-disc list-inside text-gray-500 mb-4">
              <li>Direct outbound call to HireWithTess </li>
              <li>Provide your Interview ID when prompted</li>
              <li>AI will conduct the interview over the phone</li>
              <li>Ideal for verbal communication</li>
            </ul>
          </div>
          <Button
            onClick={handleCallInterview}
            className="mt-4 px-5 py-3 text-white font-semibold rounded-lg transition w-full text-center"
          >
            Call HireWithTess Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChooseInterviewOption;
