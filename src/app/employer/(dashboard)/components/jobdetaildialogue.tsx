import React from 'react';
import UseGetJobInterviewByID from '@/Routes/Employer/hooks/GET/jobposting/GetJobInterviewByID.hook';
import { Card, CardContent } from "@/components/ui/card";
import JobInterviewProps from '@/Types/EmployerDashboard/Dashboard/jobposted/postedjob';
import StatusBadge from './status.badge'; 

interface CustomJobDetailDialogueProps {
  jobId: string;
  isOpen: boolean;
  onClose: () => void;
}


const CustomJobDetailDialogue = ({ jobId}: CustomJobDetailDialogueProps) => {
  const { data: response, isLoading, error } = UseGetJobInterviewByID(jobId);

  if (isLoading) {
    return (
      <div className="p-4">
        <p className="text-sm text-muted">Loading job interview details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-sm text-red-500">Error loading interview details. Please try again.</p>
      </div>
    );
  }

  if (!response?.items || !Array.isArray(response.items) || response.items.length === 0) {
    return (
      <div className="p-4">
        <p className="text-sm text-muted">No interview data available for this job.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold"></h3>
        <p className="text-sm text-gray-500">Total Interviews: {response.total}</p>
        
      </div>
      
      {response.items.map((interview: JobInterviewProps) => (
        <Card key={interview.id} className="w-full shadow-md border rounded-xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Candidate Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {interview.candidate_name}</p>
                    <p><span className="font-medium">Email:</span> {interview.email}</p>
                    <p><span className="font-medium">Phone:</span> {interview.phone}</p>
                    {interview.resume && (
                      <p>
                        <span className="font-medium">Resume:</span>{' '}
                        <a 
                          href={interview.resume} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          View Resume
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Interview Status</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Status:</span> 
                      <StatusBadge status={interview.status} key={`status-${interview.id}`} />,
                    </p>
                    <p><span className="font-medium">AI Score:</span> {interview.ai_score !== null ? `${interview.ai_score}%` : 'N/A'}</p>
                    <p><span className="font-medium">Interview Date:</span> {new Date(interview.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* {interview.answers && interview.answers.length > 0 && (
              <div className="mt-6">
                <h3 className="font-medium text-gray-700 mb-3">Interview Responses</h3>
                <div className="space-y-4">
                  {interview.answers.map((answer: CandidateAnswersProps, answerIndex: number) => (
                    <div key={answerIndex} className="border rounded-lg p-4">
                      <p className="font-medium mb-2">Question {answerIndex + 1}:</p>
                      <p className="text-sm text-gray-600 mb-2">{answer.question}</p>
                      <p className="font-medium mb-1">Answer:</p>
                      <AudiVideodialogue
                       answer={answer}
                       index={answerIndex}
                        question={answer.question}
                         submission_type={answer.submission_type}
                          url={answer.url}
                          //  temp_url={answer.temp_url}
                            />
                      <p className="text-sm text-gray-600">{answer.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )} */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CustomJobDetailDialogue;