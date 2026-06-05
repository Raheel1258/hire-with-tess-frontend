'use client';

import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Finished() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] px-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg max-w-xl w-full text-center">
        <div className="flex justify-center mb-4 sm:mb-6">
          <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-[#f7941D]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">Interview Completed</h1>
        <p className="text-gray-600 text-base sm:text-lg mb-4 sm:mb-6">
          Thank you for completing your interview. We appreciate your time and effort!
        </p>
        <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8">
          Our team is reviewing your responses. We’ll get back to you shortly with the next steps.
        </p>
      </div>
    </div>
  );
}
