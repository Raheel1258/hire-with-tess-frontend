"use client";
import { BriefcaseBusiness, Users } from "lucide-react";
import CardComponent from "@/app/employer/(dashboard)/components/card";
import { ChartComponent } from "../component/chart";
import useAnalyses from "@/Routes/Employer/hooks/GET/analysis/GetAnalyses.hook";

export default function Analytics() {


  const {data: analysisdata} = useAnalyses();

  return (
    <div className="min-w-0 w-full">
      <h1 className="mb-4 ml-2 text-[24px] font-semibold">
        Analytics
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        <CardComponent
          heading=" Total Job Posting "
          subheading={analysisdata?.total_job_postings}
          icon={<Users className="text-[#f7941D]" />}
        ></CardComponent>
        <CardComponent
          heading="Active Employers"
          subheading={analysisdata?.active_employers}
          icon={
            <BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />
          }
        ></CardComponent>

        <CardComponent
          heading="Subscription Revenue"
          subheading={analysisdata?.subscription_revenue}
          icon={
            <BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />
          }
        ></CardComponent>
        <CardComponent
          heading="Total Candidates Processed"
          subheading={analysisdata?.total_candidates}
          icon={
            <BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />
          }
        ></CardComponent>
        <CardComponent
          heading=" Shortlisted Candidates "
          subheading={analysisdata?.shortlisted_candidates}
          icon={<Users className="text-[#f7941D]" />}
        ></CardComponent>
        <CardComponent
          heading="Candidate Success Rate(%)"
          subheading={analysisdata?.candidate_success_rate}
          icon={
            <BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />
          }
        ></CardComponent>

        <CardComponent
          heading="Total Interviews Completed"
          subheading={analysisdata?.total_interviews}
          icon={
            <BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />
          }
        ></CardComponent>
        <CardComponent
          heading="Job with No Applicants"
          subheading={analysisdata?.jobs_without_applicants}
          icon={
            <BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />
          }
        ></CardComponent>
      </div>
      <h2 className="mt-6 text-[24px] font-semibold leading-[30px]">
        Job Market Insights
      </h2>
      <div className="mt-6 w-full min-w-0">
        <ChartComponent />
      </div>
    </div>
  );
}
