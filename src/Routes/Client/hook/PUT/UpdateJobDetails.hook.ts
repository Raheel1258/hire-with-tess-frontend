import { updateJobDetails } from '@/Routes/Client/Api/api.routes';
import { useMutation } from '@tanstack/react-query';
import useHomeStore from '@/store/Employer/home.store';
import JobDetails from '@/Types/Employer/jobdetails.type';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
export const useUpdateJob = () => {
  const { jobId } = useHomeStore();
  const router = useRouter();
  const { setCompanyName, setCurrency, setJobType, setLocation, setJobTitle, setSalary } =
    useHomeStore();
  return useMutation({
    mutationFn: (data: JobDetails) => updateJobDetails(jobId, data),
    onSuccess: async (data) => {
      setCompanyName(data.company_name);
      setJobTitle(data.job_title);
      setJobType(data.job_type);
      setLocation(data.location);
      setSalary(data.salary);
      setCurrency(data.currency);
      router.push(`/interview/review/${jobId}`);
    },
    onError: async (error) => {
      const axiosError = error as AxiosError<{ detail: string }>;
      toast.error(' Failed to Update Details', {
        description: axiosError.response?.data?.detail,
      });
    },
  });
};
