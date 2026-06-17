'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Check, Pencil, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

import { useSkillStore } from '@/store/Employer/InputStore';
import useResReqHook from '@/Routes/Client/hook/PUT/UpdateResReq.hook';
import useHomeStore from '@/store/Employer/home.store';

interface OutputCardProps {
  res: string[];
  req: string[];
  skill: string[];
  avatarSrc?: string;
  buttonText?: string;
  showAvatar?: boolean;
  showEditIcon?: boolean;
  showHeading?: boolean;
  containerPadding?: string;
  cardPadding?: string;
  onGenerateClick?: () => void;
}

export default function OutputCard({
  res=[],
  req=[],
  skill=[],
  avatarSrc = '/images/AIAvatar.png',
  buttonText = 'Generate',
  showAvatar = true,
  showEditIcon = true,
  showHeading = true,
  cardPadding = 'p-4 sm:p-6',
  containerPadding = 'px-8',
  onGenerateClick,
}: OutputCardProps) {
  const ReqResMutation = useResReqHook();
  const { isEditable, setIsEditable } = useSkillStore();
  const {
    skills,
    setSkills,
    requirements,
    setRequirements,
    responsibilities,
    setResponsibilities,
  } = useHomeStore();

  const isUnchanged =
    JSON.stringify(responsibilities) === JSON.stringify(res) &&
    JSON.stringify(requirements) === JSON.stringify(req) &&
    JSON.stringify(skills) === JSON.stringify(skill);

  const handleCancel = () => {
    setResponsibilities(res);
    setRequirements(req);
    setSkills(skill);
    setIsEditable(false);
  };

  const handleSave = () => {
    const updatedResponsibilities = responsibilities
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);

    const updatedRequirements = requirements
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);

    if (isUnchanged) {
      toast.info('No changes made.');
      return;
    }

    ReqResMutation.mutate({
      data: {
        skills,
        responsibilities: updatedResponsibilities,
        requirements: updatedRequirements,
      },
    });

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

  return (
    <div className={`flex flex-col gap-4 ${containerPadding}`}>
      {showHeading && (
        <h1 className="font-semibold text-[20px] leading-[30px]">
          AI Powered Response
        </h1>
      )}

      <div className="flex items-start gap-6 mt-4">
        {showAvatar && (
          <Image src={avatarSrc} alt="bot" width={40} height={40} className="shrink-0" />
        )}

        <Card className={`w-full rounded-2xl ${cardPadding}`}>
          <div className="text-left space-y-6">
            {res.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-[14px] text-black font-semibold">Responsibilities</h3>
                  {!isEditable ? (
                    showEditIcon && (
                      <Pencil size={18} color="#718096" onClick={() => setIsEditable(true)} className="cursor-pointer" />
                    )
                  ) : isUnchanged ? (
                    <X size={18} color="orange" onClick={handleCancel} className="cursor-pointer" />
                  ) : (
                    <Check size={18} color="green" onClick={handleSave} className="cursor-pointer" />
                  )}
                </div>

                {!isEditable ? (
                  <ul className="list-disc pl-5 text-[14px] text-black">
                    {res.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                ) : (
                  <textarea
                  value={responsibilities.join('\n')}
                  onChange={e => setResponsibilities(e.target.value.split('\n'))}
                    className="w-full h-40 p-2 border rounded-md resize-none text-[14px]"
                  />
                )}
              </div>
            )}

            {/* Requirements */}
            {req.length > 0 && (
              <div>
                <h3 className="text-[14px] text-black mb-2 font-semibold">Requirements</h3>
                {!isEditable ? (
                  <ul className="list-disc pl-5 text-[14px] text-black">
                    {req.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                ) : (
                  <textarea
                    value={requirements.join('\n')}
                    onChange={e => setRequirements(e.target.value.split('\n'))}
                    className="w-full h-40 p-2 border rounded-md resize-none text-[14px]"
                  />
                )}
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Skills */}
      {skills.length > 0 && (
          <Card className="w-full rounded-2xl p-4 sm:p-6">
            <h1 className="text-base text-black text-left font-semibold">Skills:</h1>
        <div className="flex items-start gap-4">
          {showAvatar && (
            <Image src={avatarSrc} alt="bot" width={40} height={40} className="shrink-0" />
          )}

          <div className="flex flex-wrap gap-2">
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
        </div>
        </Card>
      )}

      {/* Generate Button */}
      {onGenerateClick && (
        <Button onClick={onGenerateClick} className="w-full sm:w-auto flex items-center gap-2">
          {buttonText}
        </Button>
      )}
    </div>
  );
}
