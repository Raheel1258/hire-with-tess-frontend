"use client";
import InterviewLayout from "@/components/layout/InterviewLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import GenerateQuestionResponse from "@/Routes/Client/hook/POST/GenerateQuestion.hook";
import { useEffect, useRef } from "react";
import { Check, CirclePlus, Loader2, Pencil, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import useUpdateJobQuestion from "@/Routes/Client/hook/PUT/UpdateJobQuestion.hook";
import { useSkillStore } from "@/store/Employer/InputStore";
import { useQuestionStore } from "@/store/Employer/questionStore";
import Image from "next/image";
import UseRegenerateQuestionHook from "@/Routes/Client/hook/POST/RegenerateQuestion.hook";
import QuestionType from "@/Types/Employer/question.type";

export default function Questionnaire() {
  const { jobId } = useParams<{ jobId: string }>();
  const router = useRouter();

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
    if (!jobId || hasFetched.current || generateQuestionMutation.isSuccess)
      return;
    generateQuestionMutation.mutate({ job_id: jobId });
    hasFetched.current = true;
  }, [jobId, generateQuestionMutation]);

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
    updated[index] = { ...updated[index], text: newText, type: "audio" };
    setEditedQuestions(updated);
  };

  const addnewInput = () => {
    setManualQuestion(true);
    setIsEditable(true);
  };

  const handleNewQuestionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewQuestionText(e.target.value);
  };

  const handleAddNewQuestion = () => {
    if (newQuestionText.trim()) {
      const newQuestion: QuestionType = {
        text: newQuestionText.trim(),
        type: "audio",
      };
      const updatedQuestions = [...editedQuestions, newQuestion];
      setEditedQuestions(updatedQuestions);
      updateJobQuestionMutation.mutate({
        questions: updatedQuestions,
      });
      setNewQuestionText("");
      setIsEditable(false);
      setManualQuestion(false);
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
      >
        <div className="text-left space-y-2 w-full">
          <h2 className="text-lg font-semibold mt-4 mb-6">
            AI Powered Questions:
          </h2>
          <ul className="space-y-4 w-full">
            {/* {Aiquestions.length === 0 ? (
              <div className="flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-500" />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <h1>hello</h1>
              </div>
            )} */}

            {editedQuestions?.map((question: QuestionType, index: number) => {
              const isEditing = editableQuestionIndex === index;
              const aiQuestionText = Aiquestions[index]?.text || "";
              const hasChanged = question.text !== aiQuestionText;

              return (
                <li key={index} className="flex items-center gap-4 w-full">
                  <Image
                    src="/images/AIAvatar.png"
                    alt="bot"
                    width={40}
                    height={40}
                  />
                  <div className="relative w-full">
                    {isEditing ? (
                      <Textarea
                        value={question.text}
                        onChange={(e) =>
                          handleTextChange(index, e.target.value)
                        }
                        className="w-full h-[38px] sm:h-[100px] rounded-[14px] border text-black bg-white p-2"
                        autoFocus
                      />
                    ) : (
                      <div className="relative">
                        <p className="w-full h-[68px] rounded-[14px] border-1 text-black bg-white p-2 flex items-center">
                          <span className="text-base font-semibold">
                            {index + 1}.
                          </span>
                          {question.text}
                        </p>
                      </div>
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

            {manualQuestion && (
              <div className="flex items-center gap-4 w-full">
                <Image
                  src="/images/AIAvatar.png"
                  alt="bot"
                  width={40}
                  height={40}
                />
                <div className="relative w-full">
                  <Textarea
                    value={newQuestionText}
                    onChange={handleNewQuestionChange}
                    className="w-full h-[38px] sm:h-[100px] rounded-[14px] border text-black bg-white p-2"
                    placeholder="Enter your question here..."
                    autoFocus
                  />
                  {newQuestionText.trim() ? (
                    <Check
                      size={18}
                      color="green"
                      onClick={handleAddNewQuestion}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                    />
                  ) : (
                    <X
                      size={18}
                      color="orange"
                      onClick={() => {
                        cancelEditing();
                        setManualQuestion(false);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                    />
                  )}
                </div>
              </div>
            )}
          </ul>
        </div>

        <div className="flex flex-row items-center justify-center gap-2 mt-4">
          <Button
            className="cursor-pointer rounded-full"
            type="button"
            disabled={regenerateQuestionMutation.isPending}
            onClick={handleRegenerateQuestions}
          >
            <Image src="/images/Vector.png" alt="alt" width={20} height={20} />
            {regenerateQuestionMutation.isPending
              ? "Generating"
              : "Generate with AI"}
          </Button>
          <Button
            className="cursor-pointer rounded-full bg-transparent text-black border hover:text-white"
            type="button"
            onClick={addnewInput}
          >
            <CirclePlus />
            add manually
          </Button>
        </div>

        {editedQuestions?.length > 0 && (
          <div className="flex justify-end sm:justify-end items-center mt-6 gap-4">
            <Button onClick={() => router.back()} variant="secondary">
              Back
            </Button>
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
