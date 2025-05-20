import InterviewLayout from "@/components/layout/InterviewLayout";
import Stepper from "../component/stepper";
import CustomForm from "../component/customform";
import JobDescription from "../component/description";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function InterviewReview() {
  return (
    <InterviewLayout
      subtitle="Review Your AI-Generated Interview"
      description="Take a final look before sharing it with candidates. You can edit or regenerate questions if needed."
    >
      <div className="w-full p-6">
        <div className="flex justify-center items-center mt-3 mb-6">
          <Stepper currentStep={3} />
        </div>
        <CustomForm />
        <div className="mt-6">
          <JobDescription />
        </div>
        <div className="flex float-right gap-2 mt-4">
      <Button variant="secondary">Back</Button>
      <Link href="/interview/signup">
      <Button className="w-40" type="submit">
            Sign upto Continue
          </Button></Link>
         
  </div>
      </div>
    </InterviewLayout>
  );
}
