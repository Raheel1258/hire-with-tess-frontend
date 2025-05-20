'use client';

import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Finished() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-[#f7941D]" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Interview Completed</h1>
        <p className="text-gray-600 text-lg mb-6">
          Thank you for completing your interview. We appreciate your time and effort!
        </p>
        <p className="text-gray-500 mb-8">
          Our team is reviewing your responses. We’ll get back to you shortly with the next steps.
        </p>
      </div>
    </div>
  );
}
