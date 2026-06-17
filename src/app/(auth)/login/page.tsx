'use client';

import LoginForm from '@/app/interview/component/loginform';
import { Card } from '@/components/ui/card';
import { Suspense } from 'react';

function EmployeeSignIn() {
  return (
    <div className="flex items-center justify-center p-2 sm:p-10 w-full min-h-screen">
      <div className="w-full items-center justify-center">
        <Card className="items-center justify-center p-4 sm:p-8">
          <h1 className="text-center mb-2 text-xl sm:text-2xl font-normal">
            Hirewithtess
          </h1>
          <h1 className="font-medium text-2xl text-center">
            Sign In to your Account
          </h1>
          <p className="text-[#606778] text-lg font-semibold text-center">
            Easily create interviews and manage candidates
          </p>

          <div className="mt-10 w-full sm:w-fit">
            <LoginForm />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function EmployeeSignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmployeeSignIn />
    </Suspense>
  );
}
