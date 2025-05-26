import { updateResReq } from '@/Routes/Client/Api/api.routes';
import useHomeStore from '@/store/Employer/home.store';
import UpdateResponse from '@/Types/Employer/Updateresponse';
import { useMutation } from '@tanstack/react-query';
export default function useResReqSkillHook() {
  const { jobId } = useHomeStore();

  return useMutation({
    mutationFn: ({
      data,
    }: {
      data: UpdateResponse
    }) => updateResReq(jobId, data),
  });
}
