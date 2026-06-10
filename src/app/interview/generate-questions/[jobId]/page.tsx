'use client';
import InterviewLayout from '@/components/layout/InterviewLayout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import GenerateQuestionResponse from '@/Routes/Client/hook/POST/GenerateQuestion.hook';
import { useEffect, useRef } from 'react';
import { Check, CirclePlus, Pencil, Trash, X } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import useUpdateJobQuestion from '@/Routes/Client/hook/PUT/UpdateJobQuestion.hook';
import { useSkillStore } from '@/store/Employer/InputStore';
import { useQuestionStore } from '@/store/Employer/questionStore';
import Image from 'next/image';
import UseRegenerateQuestionHook from '@/Routes/Client/hook/POST/RegenerateQuestion.hook';
import QuestionType from '@/Types/Employer/question.type';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';

export default function Questionnaire() {
  const { jobId } = useParams<{ jobId: string }>();

  const { editableQuestionIndex, setEditableQuestionIndex, setIsEditable } =
    useSkillStore();
  const {
    editedQuestions,
    manualQuestion,
    Aiquestions,
    newQuestionText,
    setManualQuestion,
    setEditedQuestions,
    setNewQuestionText,
    setAiQuestions,
  } = useQuestionStore();

  const updateJobQuestionMutation = useUpdateJobQuestion();
  const generateQuestionMutation = GenerateQuestionResponse();
  const regenerateQuestionMutation = UseRegenerateQuestionHook();

  const handleRegenerateQuestions = () => {
    if (!jobId) return;
    regenerateQuestionMutation.mutate({
      job_id: jobId,
      questions: Aiquestions,
    });
  };

  const hasFetched = useRef(false);

  useEffect(() => {
    if (
      !jobId ||
      hasFetched.current ||
      generateQuestionMutation.isSuccess ||
      Aiquestions.length > 0
    )
      return;
    generateQuestionMutation.mutate({ job_id: jobId });
    hasFetched.current = true;
  }, [jobId, generateQuestionMutation, Aiquestions]);

  useEffect(() => {
    setEditedQuestions(Aiquestions);
  }, [Aiquestions, setEditedQuestions]);

  const startEditing = (index: number) => {
    setEditableQuestionIndex(index);
    setIsEditable(true);
  };

  const cancelEditing = () => {
    setEditedQuestions(Aiquestions);
    setEditableQuestionIndex(null);
    setIsEditable(false);
  };

  const saveChanges = () => {
    const editedTexts = editedQuestions.map((q) => q.text);
    const aiTexts = Aiquestions.map((q) => q.text);

    if (JSON.stringify(editedTexts) !== JSON.stringify(aiTexts)) {
      updateJobQuestionMutation.mutate({ questions: editedQuestions });
    }
    setEditableQuestionIndex(null);
    setIsEditable(false);
  };

  const handleTextChange = (index: number, newText: string) => {
    const updated = [...editedQuestions];
    updated[index] = { ...updated[index], text: newText, type: 'audio' };
    setEditedQuestions(updated);
  };

  const addnewInput = () => {
    setManualQuestion(true);
    setIsEditable(true);
  };

  const handleNewQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewQuestionText(e.target.value);
  };

  const handleAddNewQuestion = () => {
    if (newQuestionText.trim()) {
      const newQuestion: QuestionType = {
        text: newQuestionText.trim(),
        type: 'audio',
      };
      const updatedQuestions = [...editedQuestions, newQuestion];
      setEditedQuestions(updatedQuestions);
      updateJobQuestionMutation.mutate({
        questions: updatedQuestions,
      });
      setNewQuestionText('');
      setIsEditable(false);
      setManualQuestion(false);
    }
  };

  const handleRemoveQuestion = (indexToRemove: number) => {
    const updatedEditedQuestions = editedQuestions.filter(
      (_, index) => index !== indexToRemove,
    );
    const updatedAiQuestions = Aiquestions.filter((_, index) => index !== indexToRemove);

    setEditedQuestions(updatedEditedQuestions);
    setAiQuestions(updatedAiQuestions);
    updateJobQuestionMutation.mutate({ questions: updatedEditedQuestions });

    if (editableQuestionIndex === indexToRemove) {
      setEditableQuestionIndex(null);
      setIsEditable(false);
    }
  };

  return (
    <div>
      <InterviewLayout
        showStepper={true}
        currentStep={2}
        showGoogleLogin={false}
        useCard={false}
        description="Review, Edit, or regenerate questions before finalizing your interview"
        contentClassName="max-sm:px-3 max-sm:py-4"
      >
        <div className="text-left space-y-2 w-full min-w-0">
          <h2 className="text-base sm:text-lg font-semibold mt-4 mb-4 sm:mb-6">
            AI Powered Questions:
          </h2>
          <ul className="space-y-3 sm:space-y-4 w-full min-w-0">
            {Aiquestions.length === 0 ? (
              <>
                <li className="flex items-start gap-2 sm:gap-4 w-full min-w-0">
                  <Skeleton className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shrink-0" />
                  <Skeleton className="flex-1 min-w-0 h-[68px] rounded-[14px]" />
                </li>
                <li className="flex items-start gap-2 sm:gap-4 w-full min-w-0">
                  <Skeleton className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shrink-0" />
                  <Skeleton className="flex-1 min-w-0 h-[68px] rounded-[14px]" />
                </li>
                <li className="flex items-start gap-2 sm:gap-4 w-full min-w-0">
                  <Skeleton className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shrink-0" />
                  <Skeleton className="flex-1 min-w-0 h-[68px] rounded-[14px]" />
                </li>
              </>
            ) : (
              <>
                {editedQuestions?.map((question: QuestionType, index: number) => {
                  const isEditing = editableQuestionIndex === index;
                  const aiQuestionText = Aiquestions[index]?.text || '';
                  const hasChanged = question.text !== aiQuestionText;

                  return (
                    <li
                      key={index}
                      className="flex items-start gap-2 sm:gap-4 w-full min-w-0"
                    >
                      <Image
                        src="/images/AIAvatar.png"
                        alt="bot"
                        width={40}
                        height={40}
                        className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 mt-2 sm:mt-0"
                      />
                      <div className="relative flex-1 min-w-0">
                        {isEditing ? (
                          <Textarea
                            value={question.text}
                            onChange={(e) => handleTextChange(index, e.target.value)}
                            className="w-full min-h-[80px] sm:h-[100px] rounded-[14px] border text-black bg-white p-2 pr-10 sm:pr-12 text-sm sm:text-base"
                            autoFocus
                          />
                        ) : (
                          <p className="w-full min-h-[56px] sm:min-h-[68px] rounded-[14px] border text-black bg-white py-2.5 px-3 pr-10 sm:p-2 sm:pr-12 text-sm sm:text-base leading-snug break-words">
                            <span className="font-semibold mr-1">{index + 1}.</span>
                            {question.text}
                          </p>
                        )}
                        <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                          {isEditing ? (
                            hasChanged ? (
                              <Check
                                size={18}
                                color="green"
                                onClick={saveChanges}
                                className="cursor-pointer shrink-0"
                              />
                            ) : (
                              <X
                                size={18}
                                color="orange"
                                onClick={cancelEditing}
                                className="cursor-pointer shrink-0"
                              />
                            )
                          ) : (
                            <Pencil
                              size={18}
                              color="#718096"
                              onClick={() => startEditing(index)}
                              className="cursor-pointer shrink-0"
                            />
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(index)}
                        className="shrink-0 mt-2.5 sm:mt-0 p-1 cursor-pointer text-red-500 hover:scale-110 transition-all duration-300"
                        aria-label={`Remove question ${index + 1}`}
                      >
                        <Trash size={18} />
                      </button>
                    </li>
                  );
                })}
              </>
            )}

            {manualQuestion && (
              <div className="flex items-start gap-2 sm:gap-4 w-full min-w-0">
                <Image
                  src="/images/AIAvatar.png"
                  alt="bot"
                  width={40}
                  height={40}
                  className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 mt-2"
                />
                <div className="relative flex-1 min-w-0">
                  <Textarea
                    value={newQuestionText}
                    onChange={handleNewQuestionChange}
                    className="w-full min-h-[80px] sm:h-[100px] rounded-[14px] border text-black bg-white p-2 pr-10 sm:pr-12 text-sm sm:text-base"
                    placeholder="Enter your question here..."
                    autoFocus
                  />
                  {newQuestionText.trim() ? (
                    <Check
                      size={18}
                      color="green"
                      onClick={handleAddNewQuestion}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 cursor-pointer shrink-0"
                    />
                  ) : (
                    <X
                      size={18}
                      color="orange"
                      onClick={() => {
                        cancelEditing();
                        setManualQuestion(false);
                      }}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 cursor-pointer shrink-0"
                    />
                  )}
                </div>
                <div className="shrink-0 w-[26px]" aria-hidden="true" />
              </div>
            )}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mt-4 w-full">
          <Button
            className="cursor-pointer rounded-full w-full sm:w-auto"
            type="button"
            disabled={regenerateQuestionMutation.isPending}
            onClick={handleRegenerateQuestions}
          >
            <Image src="/images/Vector.png" alt="alt" width={20} height={20} />
            {regenerateQuestionMutation.isPending ? (
              <Loader2 className="animate-spin itext-white" />
            ) : (
              'Generate with AI'
            )}
          </Button>
          <Button
            className="cursor-pointer rounded-full w-full sm:w-auto bg-transparent text-black border hover:text-white hover:bg-[#f7941D] hover:border-transparent"
            type="button"
            onClick={addnewInput}
          >
            <CirclePlus />
            add manually
          </Button>
        </div>

        {editedQuestions?.length > 0 && (
          <div className="flex flex-col-reverse sm:flex-row justify-end items-stretch sm:items-center mt-6 gap-3 sm:gap-4">
            <Link href={`/interview?job_id=${jobId}`}>
              <Button
                type="button"
                variant="secondary"
                className="w-full sm:w-auto cursor-pointer"
              >
                Back
              </Button>
            </Link>
            <Link href={`/interview/job-details/${jobId}`}>
              <Button
                type="button"
                disabled={!jobId}
                className="w-full sm:w-auto cursor-pointer"
              >
                Next Step
              </Button>
            </Link>
          </div>
        )}
      </InterviewLayout>
    </div>
  );
}
