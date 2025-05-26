"use client";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { customformSchema, FormValidator } from "@/schema/customform.schema";
import Image from "next/image";
import useHomeStore from "@/store/Employer/home.store";
import Link from "next/link";
import InterviewLayout from "@/components/layout/InterviewLayout";
import CustomInputForm from "@/app/interview/component/customformInput";
import { Check, Pencil } from "lucide-react";
import { useSkillStore } from "@/store/Employer/InputStore";
import { useParams } from "next/navigation";
import { useUpdateJob } from "@/Routes/Client/hook/PUT/UpdateJobDetails.hook";
import { useRouter } from "next/navigation";

export default function InterviewForm() {
  const { jobDescription } = useHomeStore();
  const { isEditDescription, setIsEditableDescription } = useSkillStore();

  const { jobId } = useParams<{ jobId: string }>();
  const generateMutation = useUpdateJob();
  const router = useRouter();

  const form = useForm<FormValidator>({
    resolver: zodResolver(customformSchema),
    defaultValues: {
      jobDescription: jobDescription,
      jobTitle: "",
      jobType: "",
      companyName: "",
      location: "",
      salary: "",
    },
  });
  const ref = useRef<HTMLFormElement>(null);

  const onSubmit = async (data: FormValidator) => {
    generateMutation.mutate({
      job_description: data.jobDescription,
      job_title: data.jobTitle,
      job_type: data.jobType,
      company_name: data.companyName,
      location: data.location,
      salary: data.salary,
      currency: data.currency,
    });
  };

  const handleReviewClick = async () => {
    const isValid = await form.trigger(); // validate form
    if (!isValid) return;

    const formData = form.getValues();

    generateMutation.mutate(
      {
        job_description: formData.jobDescription,
        job_title: formData.jobTitle,
        job_type: formData.jobType,
        company_name: formData.companyName,
        location: formData.location,
        salary: formData.salary,
        currency: formData.currency,
      },
      {
        onSuccess: () => {
          router.push(`/interview/review/${jobId}`);
        },
      }
    );
  };

  const handleEditDescription = () => {
    setIsEditableDescription(true);
  };

  const UpdateJobDescription = () => {
    setIsEditableDescription(false);
  };

  return (
    <>
      <InterviewLayout
        currentStep={3}
        description="Your AI-powered Job breakdown — sharp, clear, and ready to impress."
        showGoogleLogin={false}
        useCard={false}
      >
        <div className=" text-center pt-10 pb-10 w-full ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              ref={ref}
              className="space-y-8 px-4"
            >
              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <CustomInputForm
                      {...field}
                      name="jobDescription"
                      label="Position Overview"
                      type="textarea"
                      placeholder={jobDescription || "Position Overview here"}
                      readOnly={!isEditDescription}
                      icon={
                        isEditDescription ? (
                          <Check
                            size={16}
                            color="green"
                            strokeWidth={0.75}
                            style={{ cursor: "pointer" }}
                            onClick={UpdateJobDescription}
                          />
                        ) : (
                          <Pencil
                            size={18}
                            color="#718096"
                            style={{ cursor: "pointer" }}
                            onClick={handleEditDescription}
                          />
                        )
                      }
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <CustomInputForm
                      {...field}
                      name="jobTitle"
                      label="Job Title"
                      placeholder="Job Title here"
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <CustomInputForm
                    {...field}
                    name="jobType"
                    label="Job Type"
                    jobTypeName="jobType"
                  />
                )}
              />
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <CustomInputForm
                      {...field}
                      name="companyName"
                      label="Company Name"
                      placeholder="Company Name here"
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <CustomInputForm
                      {...field}
                      name="location"
                      label="Location "
                      placeholder="Location here"
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salary"
                render={() => (
                  <FormItem>
                    <CustomInputForm
                      name="salary"
                      currencyName="currency"
                      label="Salary"
                      placeholder="Enter salary here"
                      type="number"
                    />
                  </FormItem>
                )}
              />
              <div className="flex justify-end sm:justify-end items-center gap-4">
                <Link href={`/interview/generate-questions/${jobId}`}>
                  <Button
                    variant={"secondary"}
                    className=" sm:w-auto cursor-pointer"
                    type="button"
                  >
                    Cancel
                  </Button>
                </Link>
                <Link href={`/interview/review/${jobId}`}>
                  <Button
                    type="submit"
                    disabled={generateMutation.isPending || !jobId}
                    onClick={handleReviewClick}
                    className="w-full sm:w-auto cursor-pointer"
                  >
                    <Image
                      src="/images/Vector.png"
                      alt="alt"
                      width={20}
                      height={20}
                    />
                    Review Details
                  </Button>
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </InterviewLayout>
    </>
  );
}
