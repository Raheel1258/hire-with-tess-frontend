'use client';
import { useParams } from 'next/navigation';
import React from 'react';

export default function PhoneCall() {
  const { jobId } = useParams<{ jobId: string }>();
  const interviewId = `INTV-${jobId}`;
  const companyName = 'HireWithTess';
  const phoneNumber = '+1-989-510-7499';

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-[#FF8C00] mb-2">{companyName}</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Phone Interview Instructions
        </h2>

        <p className="text-gray-600 mb-4">
          Call the number below to begin your AI-powered phone interview.
        </p>

        <div className="mb-4">
          <span className="text-sm text-gray-500">Call this number:</span>
          <p className="text-lg font-medium text-black">{phoneNumber}</p>
        </div>

        <div className="mb-4">
          <span className="text-sm text-gray-500">Your Interview ID:</span>
          <p className="text-lg font-semibold text-[#1E4B8E]">{interviewId}</p>
        </div>

        <p className="text-gray-600 text-sm">
          When prompted, say your Interview ID clearly to begin. The AI will then ask you
          a series of questions. Make sure you’re in a quiet place and speak clearly.
        </p>
      </div>
    </div>
  );
}
