import { Button } from '@/components/ui/button';
import useHomeStore from '@/store/Employer/home.store';
import { useQuestionStore } from '@/store/Employer/questionStore';
import { useToggleStore } from '@/store/Employer/Toggle.store';
import { getAuthCookie, getAuthRole, getAuthToken } from '@/Utils/Providers/auth';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

const AdminDashboardNavigation = () => {
  const accessToken = getAuthToken() || getAuthCookie();
  const userRole = getAuthRole() || getAuthCookie();

  const { resetInterviewLink } = useToggleStore();
  const { resetAIResponse } = useHomeStore();
  const { resetQuestionStore } = useQuestionStore();

  const ResetAll = () => {
    resetAIResponse();
    resetQuestionStore();
    resetInterviewLink();
  };

  return (
    <div className="flex justify-end items-center gap-4 mt-6 mb-0 sm:mb-1 sm:ml-4">
      {accessToken && (
        <Link href={`/`}>
          <Button
            onClick={ResetAll}
            variant={'secondary'}
            className="sm:w-auto cursor-pointer bg-[#1E4B8E] hover:bg-[#1E4B8E]/90 transition-colors"
            type="button"
          >
            Generate New Interview
          </Button>
        </Link>
      )}
      {accessToken && userRole === 'admin' && (
        <Link href={`/employer/home`}>
          <Button
            variant={'secondary'}
            className="sm:w-auto cursor-pointer bg-[#1E4B8E] hover:bg-[#1E4B8E]/90 transition-colors"
            type="button"
          >
            Go to Dashboard
          </Button>
        </Link>
      )}
      {accessToken && userRole === 'superadmin' && (
        <Link href={`/superadmin/home`}>
          <Button
            variant={'secondary'}
            className="sm:w-auto cursor-pointer bg-[#1E4B8E] hover:bg-[#1E4B8E]/90 transition-colors"
            type="button"
          >
            Go to Dashboard
          </Button>
        </Link>
      )}
    </div>
  );
};

export default AdminDashboardNavigation;
