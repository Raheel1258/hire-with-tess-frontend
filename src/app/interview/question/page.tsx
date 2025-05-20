import InterviewLayout from "@/components/layout/InterviewLayout";
import NoQuestion from "../component/emptycard";
import Image from "next/image";
import Stepper from "../component/stepper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Questionaire() {
    return (
        <div>
            <InterviewLayout >

                <div className="flex flex-col w-full h-full items-center text-center space-y-4">
                    <Stepper currentStep={2} />
                    <NoQuestion />
                    <div className="mt-auto flex justify-center w-full">
                        <Button className="flex items-center gap-2" type="submit">
                            <Image src="/images/Vector.png" alt="alt" width={20} height={20} />
                            Generate
                        </Button>
                    </div>
                </div>

            </InterviewLayout>
            <div className="flex flex-row justify-end gap-1.5 mr-6">
                <Button variant={"secondary"} type="submit">Cancel</Button>
                <Link href="/interview/review">
          <Button type="submit">Next Step</Button>
        </Link>
             
            </div>

        </div>

    );
}
