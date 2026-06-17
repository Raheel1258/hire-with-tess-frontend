'use client';
import React, { Suspense, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { Pencil, X, Check, CirclePlus } from 'lucide-react';
import InterviewLayout from '@/components/layout/InterviewLayout';
import useHomeStore from '@/store/Employer/home.store';
import { useSkillStore } from '@/store/Employer/InputStore';
import { useSearchParams } from 'next/navigation';
import useResReqHook from '@/Routes/Client/hook/PUT/UpdateResReq.hook';
import { Textarea } from '@/components/ui/textarea';

function InterviewForm() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get('job_id');

  const ref = useRef<HTMLFormElement>(null);
  const ReqResMutation = useResReqHook();
  const {
    isEditable,
    setIsEditable,
    newSkill,
    setNewSkill,
    showNewSkillInput,
    setShowNewSkillInput,
  } = useSkillStore();
  const {
    skills,
    setSkills,
    requirements,
    setRequirements,
    responsibilities,
    setResponsibilities,
    jobDescription,
  } = useHomeStore();

  const handleCancel = () => {
    setIsEditable(false);
  };

  const initialData = useRef({
    skills: [...skills],
    responsibilities: [...responsibilities],
    requirements: [...requirements],
  });

  const isArrayEqual = (a: string[], b: string[]) =>
    a.length === b.length && a.every((v, i) => v === b[i]);

  const dataChanged = !(
    isArrayEqual(skills, initialData.current.skills) &&
    isArrayEqual(requirements, initialData.current.requirements) &&
    isArrayEqual(responsibilities, initialData.current.responsibilities)
  );

  const updateValue = () => {
    ReqResMutation.mutate({
      data: {
        job_description: jobDescription,
        skills,
        responsibilities,
        requirements,
      },
    });

    initialData.current = {
      skills: [...skills],
      responsibilities: [...responsibilities],
      requirements: [...requirements],
    };

    setIsEditable(false);
  };

  const handleSkillChange = (value: string, index: number) => {
    const updated = [...skills];
    updated[index] = value;
    setSkills(updated);
  };

  const handleDeleteSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== '') {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  return (
    <>
      <InterviewLayout
        showStepper={true}
        currentStep={1}
        description="Your AI-powered Job breakdown — sharp, clear, and ready to impress."
        showGoogleLogin={false}
        useCard={false}
      >
        
        <div className="flex flex-col">
          <div className="flex items-start mt-4">
            <Image
              src="/images/AIAvatar.png"
              alt="bot"
              width={40}
              height={40}
              className="shrink-0 w-8 h-8 sm:w-10 sm:h-10"
            />
            <Card className="w-full rounded-2xl p-4 sm:p-6 ml-4">
              <form ref={ref}>
                <div className="text-left space-y-6">
                  {responsibilities.length > 0 && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-[14px] text-black font-semibold">
                          Responsibilities
                        </h3>
                        {!isEditable ? (
                          <Pencil
                            size={18}
                            color="#718096"
                            onClick={() => setIsEditable(true)}
                            className="cursor-pointer"
                          />
                        ) : !dataChanged ? (
                          <X
                            size={18}
                            color="orange"
                            onClick={handleCancel}
                            className="cursor-pointer"
                          />
                        ) : (
                          <Check
                            size={18}
                            color="green"
                            onClick={updateValue}
                            className="cursor-pointer"
                          />
                        )}
                      </div>
                      {!isEditable ? (
                        <ul className="list-disc pl-5 text-[14px] text-black">
                          {responsibilities.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <Textarea
                          value={responsibilities.join('\n')}
                          onChange={(e) =>
                            setResponsibilities(e.target.value.split('\n'))
                          }
                          className="w-full h-40 p-2 border rounded-xl resize-none text-[14px]"
                        />
                      )}
                    </div>
                  )}
                  <div>
                    <h3 className="text-[14px] text-black mb-2 font-semibold">
                      Requirements
                    </h3>
                    {!isEditable ? (
                      <ul className="list-disc pl-5 text-[14px] text-black">
                        {requirements.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <Textarea
                        value={requirements.join('\n')}
                        onChange={(e) => setRequirements(e.target.value.split('\n'))}
                        className="w-full h-40 p-2 border rounded-xl resize-none text-[14px]"
                      />
                    )}
                  </div>
                </div>
              </form>
            </Card>
          </div>
        </div>

        {skills.length > 0 && (
          <div className="flex items-start gap-4 mt-6">
            <Image
              src="/images/AIAvatar.png"
              alt="bot"
              width={40}
              height={40}
              className="shrink-0 w-8 h-8 sm:w-10 sm:h-10"
            />
             {/* Skills List */}
            <Card className="w-full rounded-2xl p-4 sm:p-6">
            <h1 className="text-[14px] text-black text-left font-semibold">AI Powered Skills:</h1>
              <div className="flex items-center justify-between flex-wrap gap-2 w-full">
                <div className="flex flex-wrap gap-2 flex-grow">
                  {skills.map((item, index) => (
                    <div key={index} className="relative w-full sm:w-auto">
                      <Input
                        value={item}
                        readOnly={!isEditable}
                        onChange={(e) => handleSkillChange(e.target.value, index)}
                        className="pr-10 border-[#E2E8F0] rounded-3xl text-black"
                      />
                      {isEditable && (
                        <button
                          onClick={() => handleDeleteSkill(index)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {isEditable && (
                  <div className="flex items-center gap-2">
                    {!showNewSkillInput ? (
                      <Button
                        variant="ghost"
                        onClick={() => setShowNewSkillInput(true)}
                        className="text-gray-500 hover:text-white hover:bg-amber-500 p-2 cursor-pointer"
                      >
                        <CirclePlus size={20} />
                      </Button>
                    ) : (
                      <>
                        <Input
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Enter skill"
                          className="w-full sm:w-48 h-10 p-2 border rounded-xl text-[14px]"
                        />
                        <Button
                          variant="ghost"
                          onClick={() => {
                            handleAddSkill();
                            setShowNewSkillInput(false);
                          }}
                          className="text-green-600 hover:text-white hover:bg-green-500 p-2 cursor-pointer"
                        >
                          <Check size={20} />
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        <div className="flex justify-end items-center mt-6 gap-4 mb-0 p-4 sm:p-0">
          <Link href="/">
            <Button variant="secondary" type="button" className="cursor-pointer">
              Cancel
            </Button>
          </Link>
          <Link href={`/interview/generate-questions/${jobId}`}>
            <Button className="cursor-pointer">Generate Question</Button>
          </Link>
        </div>
      </InterviewLayout>
    </>
  );
}

export default function InterviewPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InterviewForm />
    </Suspense>
  );
}
