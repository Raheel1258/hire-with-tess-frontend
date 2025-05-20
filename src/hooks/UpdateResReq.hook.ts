import { updateResReq } from '@/Routes/Client/Api/api.routes';
import useHomeStore from '@/store/Employee/home.store';
import { useMutation } from '@tanstack/react-query';
export default function useResReqSkillHook() {
  const { jobId } = useHomeStore();

  return useMutation({
    mutationFn: ({
      data,
    }: {
      data: {
        job_description: string;
        job_title: string;
        job_type: string;
        company_name: string;
        location: string;
        salary: string;
        currency: string;
        responsibilities: string[];
        requirements: string[];
        skills: string[];
      };
    }) => updateResReq(jobId, data),
  });
}
