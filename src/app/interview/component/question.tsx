import Image from 'next/image';
import { Check, Pencil, X } from 'lucide-react';
import { useSkillStore } from '@/store/Employee/InputStore';
import useUpdateJobQuestion from '@/hooks/UpdateJobQuestion.hook';
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

interface Response {
  text: string;
  type: string;
}

interface QuestionProps {
  questions: Response[];
  showImage?: boolean;
}

export default function Question({ questions, showImage = true }: QuestionProps) {
  const { editableQuestionIndex, setEditableQuestionIndex, setIsEditable } =
    useSkillStore();
  const [editedQuestion, setEdited] = useState([...questions]);
  const { mutate } = useUpdateJobQuestion();

  const startEditing = (index: number) => {
    setEditableQuestionIndex(index);
    setIsEditable(true);
  };

  const cancelEditing = () => {
    setEdited([...questions]);
    setEditableQuestionIndex(null);
    setIsEditable(false);
  };

  const saveChanges = () => {
    if (JSON.stringify(editedQuestion) !== JSON.stringify(questions)) {
      mutate({ questions: editedQuestion.map(q => q.text) });
    }
    setEditableQuestionIndex(null);
    setIsEditable(false);
  };

  const handleTextChange = (index: number, newText: string) => {
    setEdited((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], text: newText };
      return updated;
    });
  };

  return (
    <div className="text-left space-y-2 w-full">
      <h2 className="text-lg font-semibold mt-4 mb-6">AI Powered Questions:</h2>
      <ul className="space-y-4 w-full">
        {editedQuestion.map((question, index) => {
          const isEditing = editableQuestionIndex === index;
          const hasChanged = question.text !== questions[index].text;

          return (
            <li key={index} className="flex items-center gap-4 w-full">
              {showImage && (
                <Image src="/images/AIAvatar.png" alt="bot" width={40} height={40} />
              )}
              <div className="relative w-full">
                {isEditing ? (
                <Textarea
                value={question.text}
                onChange={(e) => handleTextChange(index, e.target.value)}
                className="w-full h-[68px] sm:h-[200px] rounded-[14px] border text-black bg-white p-2"
                autoFocus
              />
              
                ) : (
                  <p className="w-full h-[68px] rounded-[14px] border-1 text-black bg-white p-2 flex items-center 
                  ">
                    {question.text}
                  </p>
                )}

                {isEditing ? (
                  hasChanged ? (
                    <Check
                      size={18}
                      color="green"
                      onClick={saveChanges}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                    />
                  ) : (
                    <X
                      size={18}
                      color="orange"
                      onClick={cancelEditing}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                    />
                  )
                ) : (
                  <Pencil
                    size={18}
                    color="#718096"
                    onClick={() => startEditing(index)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
