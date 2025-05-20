import MainLayout from '@/components/layout/MainLayout';
import JobCard from '@/components/jobs/JobCard';

const MOCK_JOBS = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    salary: '$120k - $150k',
    remote: true,
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: 'DataSystems LLC',
    location: 'Austin, TX',
    salary: '$130k - $160k',
    remote: true,
  },
  {
    id: '3',
    title: 'UX Designer',
    company: 'CreativeMinds',
    location: 'New York, NY',
    salary: '$100k - $130k',
    remote: false,
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'CloudNative Solutions',
    location: 'Seattle, WA',
    salary: '$140k - $180k',
    remote: true,
  },
];

export default function JobsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Available Jobs</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="font-bold text-lg mb-4">Filters</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                  <select className="w-full p-2 border rounded">
                    <option value="">Any Type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input 
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="City, state, or remote"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                  <select className="w-full p-2 border rounded">
                    <option value="">Any Level</option>
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level</option>
                    <option value="senior">Senior Level</option>
                  </select>
                </div>
                
                <div className="pt-2">
                  <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-3/4">
            <div className="grid md:grid-cols-2 gap-6">
              {MOCK_JOBS.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
