'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UseUpdateJobByID from "@/Routes/Employer/hooks/PUT/job/UpdateJobByID.hook";
import { UserJobResponse } from '@/Types/userJob';
import { PencilIcon } from 'lucide-react';
import { useState } from 'react';
import StatusBadge from './status.badge';


export default function JobpProfile({ data }: { data: UserJobResponse }) {
  const { mutate: updateJob } = UseUpdateJobByID();
  const [edit, setEdit] = useState(false);
  const [editedData, setEditedData] = useState<UserJobResponse>(data);


  if (!data) return null;

  const handleEdit = () => {
    setEdit(!edit);
    if (!edit) {
      setEditedData(data);
    }
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const SaveEditedData = () => {
    updateJob({ job_id: data.id,
       data: {
        ...editedData,
        interview_questions: editedData.interview_questions.map(question => ({
          text: question.text,
          type: "audio"
        }))
       } });
    setEdit(false);
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-end">
        {edit ? (
          <Button className='bg-[#1E4B8E] text-white hover:bg-[#1E4B8E]/80' onClick={SaveEditedData}>Save Changes</Button>
        ) : (
          <Button className='bg-[#1E4B8E] text-white hover:bg-[#1E4B8E]/80' onClick={handleEdit}>Edit <PencilIcon className='w-4 h-4' /></Button>
        )}
      </div>
      <div className="text-center">
        {edit ? (
          <>
            <Input
              value={editedData.job_title}
              onChange={(e) => handleInputChange("job_title", e.target.value)}
              className="text-xl font-semibold mb-2"
            />
            <Textarea
              value={editedData.job_description}
              onChange={(e) => handleInputChange("job_description", e.target.value)}
              className="text-sm text-gray-600 mt-1"
            />
          </>
        ) : (
          <>
            <h1 className="text-xl font-semibold font-sans text-gray-800">
              {data.job_title}
            </h1>
            <p className="text-sm text-gray-600 mt-1">{data.job_description}</p>
          </>
        )}
      </div>

      <Card className="w-full shadow-md border rounded-xl">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 text-sm text-gray-700">
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">Company Info</h2>
            {edit ? (
              <>
                <div className="mb-2">
                  <label className="font-medium">Company:</label>
                  <Input
                    value={editedData.company_name}
                    onChange={(e) => handleInputChange("company_name", e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label className="font-medium">Location:</label>
                  <Input
                    value={editedData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label className="font-medium">Type:</label>
                  <Input
                    value={editedData.job_type}
                    onChange={(e) => handleInputChange("job_type", e.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                <p>
                  <span className="font-medium">Company:</span> {data.company_name ? data.company_name : <StatusBadge className="text-red-500 bg-red-100" status={"Not Generated"}/>}
                </p>
                <p>
                  <span className="font-medium">Location:</span> {data.location ? data.location : <StatusBadge className="text-red-500 bg-red-100" status={"Not Generated"}/>}
                </p>
                <p>
                  <span className="font-medium">Type:</span> {data.job_type ? data.job_type : <StatusBadge className="text-red-500 bg-red-100" status={"Not Generated"}/>}
                </p>
              </>
            )}
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">Salary & Date</h2>
            {edit ? (
              <>
                <div className="mb-2">
                  <label className="font-medium">Currency:</label>
                  <Input
                    value={editedData.currency}
                    onChange={(e) => handleInputChange("currency", e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label className="font-medium">Salary:</label>
                  <Input
                    value={editedData.salary}
                    onChange={(e) => handleInputChange("salary", e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label className="font-medium">Salary Type:</label>
                  <Input
                    value={editedData.salary_type}
                    onChange={(e) => handleInputChange("salary_type", e.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                <p>
                  <span className="font-medium">Salary:</span> {data.currency} {data.salary ? data.salary : <StatusBadge className="text-red-500 bg-red-100" status={"Not Generated"}/>}
                </p>
                <p>
                  <span className="font-medium">Type:</span> {data.salary_type ? data.salary_type : <StatusBadge className="text-red-500 bg-red-100" status={"Not Generated"}/>}
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Requirements</h2>
        {edit ? (
          <Textarea
            value={editedData.requirements?.join('\n')}
            onChange={(e) => handleInputChange("requirements", e.target.value.split('\n'))}
            className="w-full"
            rows={4}
          />
        ) : (
          <ul className="list-decimal list-inside space-y-1 text-sm text-gray-700">
            {data.requirements?.map((req: string, idx: number) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Responsibilities</h2>
        {edit ? (
          <Textarea
            value={editedData.responsibilities?.join('\n')}
            onChange={(e) => handleInputChange("responsibilities", e.target.value.split('\n'))}
            className="w-full"
            rows={4}
          />
        ) : (
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            {data.responsibilities?.map((res: string, idx: number) => (
              <li key={idx}>{res}</li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills</h2>
        {edit ? (
          <Textarea
            value={editedData.skills?.join(', ')}
            onChange={(e) => handleInputChange("skills", e.target.value.split(',').map(s => s.trim()))}
            className="w-full"
            rows={2}
            placeholder="Enter skills separated by commas"
          />
        ) : (
          <div className="flex flex-wrap gap-2">
              {data.skills?.map((skill: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full gap-2 bg-green-100 border-2 border-green-400 text-green-600 text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Questions</h2>
        {edit ? (
          <Textarea
            value={editedData.interview_questions?.map(question => question.text).join('\n')}
            onChange={(e) => handleInputChange("interview_questions", e.target.value.split('\n').map(text => ({ text })))}
            className="w-full"
            rows={4}
          />
        ) : (
          <ul className="list-decimal list-inside space-y-1 text-sm text-gray-700">
            {data.interview_questions?.map((question: { text: string }, idx: number) => (
              <li key={idx}>{question?.text}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
