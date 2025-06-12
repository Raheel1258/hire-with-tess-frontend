import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import JobInterviewProps from '@/Types/EmployerDashboard/Dashboard/jobposted/postedjob';
import StatusBadge from '@/app/employer/(dashboard)/components/status.badge';
import useGetCandidateJobs from '@/Routes/Admin/hook/GET/candidate/GetCandidate.hook';

interface CustomEmployeDialogueProps {
  jobId: string;
  isOpen: boolean;
  onClose: () => void;
}
interface CandidateJobsProps {
  id: string;
  company_name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
  currency: string;
  interview_link: string;
  job_description: string;
  job_title: string;
  job_type: string;
  location: string;
  salary: string;
  salary_type: string;
  total_interviews: number;

}


const CustomEmployeDialogue = ({ jobId}: CustomEmployeDialogueProps) => {
  const { data: response, isLoading, error } = useGetCandidateJobs(jobId);



  if (isLoading) {
    return (
      <div className="p-4">
        <p className="text-sm text-muted">Loading Employer job posted details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-sm text-red-500">Error loading Employer job posted details. Please try again.</p>
      </div>
    );
  }

  if (!response?.items || !Array.isArray(response.items) || response.items.length === 0) {
    return (
      <div className="p-4">
        <p className="text-sm text-muted">No job posted data available for this employer.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold"></h3>
        <p className="text-sm text-gray-500">Total Jobs Posted: {response.total}</p>
        
      </div>
      
      {response.items.map((interview:CandidateJobsProps ) => (
        <Card key={interview.id} className="w-full shadow-md border rounded-xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">

                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Posted Job Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Company Name:</span> {interview.company_name}</p>
                    <p><span className="font-medium">created:</span> {new Date(interview.created_at).toLocaleDateString()}</p>
                    <p><span className="font-medium">Job Title:</span> {interview.job_title}</p>
                    <p><span className="font-medium">Currency:</span> {interview.currency}</p>
                    <p><span className="font-medium">Job Type:</span> {interview.job_type}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Job Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Status:</span> 
                      <StatusBadge status={interview.status} key={`status-${interview.id}`} />,
                    </p>
                    <p><span className="font-medium">Location:</span> {interview.location}</p>
                    <p><span className="font-medium">Salary:</span> {interview.salary}</p>
                    <p><span className="font-medium">Salary Type:</span> {interview.salary_type}</p>
                    <p><span className="font-medium">Interviews:</span> {interview.total_interviews}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CustomEmployeDialogue;