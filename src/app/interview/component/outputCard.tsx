import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Check, Pencil, X } from 'lucide-react';
import { useSkillStore } from '@/store/Employee/InputStore';
import useResReqHook from '@/hooks/UpdateResReq.hook';
import useHomeStore from '@/store/Employee/home.store';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

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
  items?: string[];
  onRemove?: (index: number) => void;
}

export default function OutputCard({
  res = [],
  req = [],
  skill = [],
  avatarSrc = '/images/AIAvatar.png',
  buttonText = 'Generate',
  showAvatar = true,
  showEditIcon = true,
  showHeading = true,
  cardPadding = 'p-4 sm:p-6',
  containerPadding = 'px-8',
  onGenerateClick,
}: OutputCardProps) {
  const [skills, setSkills] = useState<string[]>(skill);
  const [editedRes, setEditedRes] = useState<string>(res.join('\n'));
  const [editedReq, setEditedReq] = useState<string>(req.join('\n'));

  const ReqResMutation = useResReqHook();
  const { jobDescription, jobTitle, jobType, companyName, salary, location, currency } =
    useHomeStore();

  const { isEditable, setIsEditable } = useSkillStore();

  const deleteSkill = (index: number) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const cancelEditing = () => {
    setEditedRes(res.join('\n'));
    setEditedReq(req.join('\n'));
    setSkills(skill);
    setIsEditable(false);
  };

  const EnableEdit = () => setIsEditable(true);

  const SaveEditedText = () => {
    const updatedRes = editedRes
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '');
    const updatedReq = editedReq
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '');

    if (
      updatedRes.join('\n') === res.join('\n') &&
      updatedReq.join('\n') === req.join('\n') &&
      JSON.stringify(skills) === JSON.stringify(skill)
    ) {
      toast.info('No changes made.');
      return;
    }
    ReqResMutation.mutate({
      data: {
        job_description: jobDescription,
        job_title: jobTitle,
        job_type: jobType,
        company_name: companyName,
        location: location,
        salary: salary,
        currency: currency,
        skills: skills,
        responsibilities: updatedRes,
        requirements: updatedReq,
      },
    });
    setIsEditable(false);
  };

  return (
    <div className={`flex flex-col gap-4  ${containerPadding}`}>
      {showHeading && (
        <h1 className="font-roboto font-semibold text-[20px] leading-[30px]">
          Ai Powered Description
        </h1>
      )}

      <div className="flex items-start gap-6">
        {showAvatar && (
          <Image src={avatarSrc} alt="bot" width={40} height={40} className="shrink-0" />
        )}
        <Card className={`${cardPadding} w-full rounded-2xl`}>
          <div className="text-left">
            {res.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-row justify-between">
                  <h3 className="font-normal font-openSans  text-[14px] leading-[24px] text-black">
                    Responsibilities
                  </h3>
                  {!isEditable ? (
                    showEditIcon && (
                      <Pencil
                        size={18}
                        color="#718096"
                        style={{ cursor: 'pointer' }}
                        onClick={EnableEdit}
                      />
                    )
                  ) : (
                    <div className="flex gap-2">
                      {editedRes.trim() === res.join('\n').trim() &&
                      editedReq.trim() === req.join('\n').trim() &&
                      JSON.stringify(skills) === JSON.stringify(skill) ? (
                        <X
                          size={18}
                          color="orange"
                          style={{ cursor: 'pointer' }}
                          onClick={cancelEditing}
                        />
                      ) : (
                        <Check
                          size={18}
                          color="green"
                          style={{ cursor: 'pointer' }}
                          onClick={SaveEditedText}
                        />
                      )}
                    </div>
                  )}
                </div>

                {!isEditable ? (
                  <ul className="list-disc pl-5 font-normal font-openSans  text-[14px] leading-[24px] text-black">
                    {editedRes
                      .split('\n')
                      .filter((line) => line.trim())
                      .map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                  </ul>
                ) : (
                  <textarea
                    value={editedRes}
                    onChange={(e) => setEditedRes(e.target.value)}
                    className="w-full p-2 border rounded-md h-40 resize-none font-normal font-openSans  text-[14px] leading-[24px]"
                  />
                )}
              </div>
            )}

            {req.length > 0 && (
              <div className="mb-4">
                <h3 className="font-normal font-openSans  text-[14px] leading-[24px] text-black">
                  Requirements
                </h3>
                {!isEditable ? (
                  <ul className="list-disc pl-5 font-normal font-openSans  text-[14px] leading-[24px] text-black">
                    {editedReq
                      .split('\n')
                      .filter((line) => line.trim())
                      .map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                  </ul>
                ) : (
                  <textarea
                    value={editedReq}
                    onChange={(e) => setEditedReq(e.target.value)}
                    className="w-full p-2 border rounded-md h-40 font-normal font-openSans  text-[14px] leading-[24px] resize-none"
                  />
                )}
              </div>
            )}
          </div>
        </Card>
      </div>

      {skills.length > 0 && (
        <div className="flex items-start gap-4">
          {showAvatar && (
            <Image
              src={avatarSrc}
              alt="bot"
              width={40}
              height={40}
              className="shrink-0"
            />
          )}

          <div className="flex flex-wrap gap-2">
            {skills.map((item, index) => (
              <div key={index} className="relative w-full sm:w-auto">
                {!isEditable ? (
                  <Input
                    value={item}
                    readOnly
                    className="w-full sm:w-auto pr-10 border-[#E2E8F0] rounded-3xl text-black cursor-not-allowed font-openSans"
                  />
                ) : (
                  <>
                    <Input
                      value={item}
                      readOnly
                      className="w-full sm:w-auto pr-10 border-[#E2E8F0] rounded-3xl text-black cursor-not-allowed font-openSans"
                    />
                    <button
                      onClick={() => deleteSkill(index)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      <X size={18} />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {onGenerateClick && (
        <Button
          onClick={onGenerateClick}
          className="w-full sm:w-auto flex items-center gap-2"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}
