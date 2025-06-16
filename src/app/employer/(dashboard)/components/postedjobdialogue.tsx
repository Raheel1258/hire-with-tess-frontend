'use client';
import { Card, CardContent } from "@/components/ui/card";


interface Postedjobprops {
  job_title?: string;
  job_description?: string;
  company_name?: string;
  location?: string;
  job_type?: string;
  currency?: string;
  salary?: string;
  salary_type?: string;
  created_at?: string;
    requirements?: string[];
  responsibilities?: string[];
  skills?: string[];
  interview_questions?: string[];
}

export default function JobpProfile({ data }: { data: Postedjobprops }) {
  if (!data) return null;

  return (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h1 className="text-xl font-semibold font-sans text-gray-800">
          {data.job_title}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          {data.job_description}
        </p>
      </div>

      <Card className="w-full shadow-md border rounded-xl">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 text-sm text-gray-700">
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">Company Info</h2>
            <p><span className="font-medium">Company:</span> {data.company_name}</p>
            <p><span className="font-medium">Location:</span> {data.location}</p>
            <p><span className="font-medium">Type:</span> {data.job_type}</p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">Salary & Date</h2>
            <p><span className="font-medium">Salary:</span> {data.currency} {data.salary}</p>
            <p><span className=" font-medium">Type:</span> {data.salary_type}</p>
            {/* <p><span className="font-medium">Posted on:</span> {new Date(data.created_at).toLocaleDateString()}</p> */}
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Requirements</h2>
        <ul className="list-decimal list-inside space-y-1 text-sm text-gray-700">
          {data.requirements?.map((req: string, idx: number) => (
            <li key={idx}>{req}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Responsibilities</h2>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          {data.responsibilities?.map((res: string, idx: number) => (
            <li key={idx}>{res}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills?.map((skill: string, idx: number) => (
            <span key={idx} className=" px-3 py-1 rounded-full gap-2 bg-green-100 border-2 border-green-400 text-green-600 text-xs">
              {skill}
              
            </span>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Questions</h2>
        <ul className="list-decimal list-inside space-y-1 text-sm text-gray-700">
          {data.interview_questions?.map((question: string, idx: number) => (
            <li key={idx}>{question?.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
