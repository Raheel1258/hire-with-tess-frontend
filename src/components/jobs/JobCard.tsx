import Link from 'next/link';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  remote: boolean;
}

export default function JobCard({ id, title, company, location, salary, remote }: JobCardProps) {
  return (
    <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-gray-600 mb-2">{company}</p>
      <p className="text-gray-500 mb-4">
        {location} {remote && "(Remote)"}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-blue-600 font-medium">{salary}</span>
        <Link href={`/jobs/${id}`} className="text-blue-600 hover:underline">
          View Details
        </Link>
      </div>
    </div>
  );
}
