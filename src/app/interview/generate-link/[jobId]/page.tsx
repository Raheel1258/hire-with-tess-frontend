'use client';
import InterviewLayout from '@/components/layout/InterviewLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy, Download, Share2 } from 'lucide-react';
import useFetchInterviewLink from '@/hooks/FetchInterviewLink.hook';
import { toast } from 'sonner';
import SocialShare from '@/app/interview/component/share';
import { useToggleStore } from '@/store/Employee/Toggle.store';
import QRCode from 'react-qr-code';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import EmployeeAuthStore from '@/store/Employee/auth.store';

export default function GenerateLink() {

  const params = useParams();
  const jobId = params?.jobId as string;

  const { data: InterviewData, isLoading } = useFetchInterviewLink(jobId);
  console.log("Link", InterviewData?.interview_link);


  const {
    copied,
    setCopied,
    showShareOptions,
    setShowShareOptions,
    showQrSharedOptions,
    setShowQrSharedOptions,
  } = useToggleStore();

  const handleCopy = () => {
    if (!InterviewData?.interview_link) return;
    navigator.clipboard.writeText(InterviewData?.interview_link);
    setCopied('Link copied to clipboard!');
    toast('Link copied to clipboard!');
    setTimeout(() => setCopied(''), 2000);
  };

  const handleDownloadQR = () => {
    if (!InterviewData?.qr_code_base64) return;
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${InterviewData.qr_code_base64}`;
    link.download = 'QR_Code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('QR Code downloaded successfully!');
  };

  const toggleShareOptions = () => {
    setShowShareOptions();
  };

  const QrToogleShareOptions = () => {
    setShowQrSharedOptions();
  };
  return (
    <InterviewLayout
      subtitle="Your AI Interview is Ready!"
      description="Share the Interview link with candidates and start collecting responses"
      subtitleClassName="font-roboto font-bold text-[34px] mt-6 text-center"
      descriptionClassName="font-roboto font-normal text-[18px] mt-4 text-[#6F6C90] text-center"
      currentStep={4}
      useCard={false}
    >
      <div className="mt-8 flex flex-col sm:w-[384px] mx-auto px-4 mb-8">
        <h1 className="font-[roboto] leading-[46px] font-bold text-[24px] text-center">
          Interview Link
        </h1>
        <p className="font-openSans font-normal text-[16px] leading-[16px] text-center text-[#6F6C90] mt-2">
          Copy and share the link with candidates
        </p>

        <div className="flex flex-row gap-3 items-center w-full sm:w-[400px] mt-6 relative">
          <Input
            value={isLoading ? "Generating Interview Link..." : InterviewData?.interview_link || "No link available"}
            readOnly
            onClick={() => {
              if (!isLoading && InterviewData?.interview_link) {
                window.open(InterviewData.interview_link, '_blank');
              }
            }}
            disabled={isLoading || !InterviewData?.interview_link}
            className={cn(
              "w-full h-[65px] border border-gray-300 rounded-[14px] px-4 pr-14 text-ellipsis overflow-hidden truncate",
              isLoading || !InterviewData?.interview_link
                ? "cursor-not-allowed text-gray-400 underline"
                : "cursor-pointer text-[#4A3AFF] underline"
            )}
          />

          <Button
            type="button"
            variant="ghost"
            className="absolute right-16 top-1/2 transform -translate-y-1/2 p-2 hover:bg-transparent"
            onClick={handleCopy}
          >
            <Copy size={20} className={copied ? 'text-blue-500' : 'text-gray-600'} />
          </Button>

          <div className="ml-2">
            <Share2
              onClick={toggleShareOptions}
              className="text-gray-600 bg-slate-200 rounded-full h-[36px] w-[34px] p-1"
            />
          </div>
        </div>

        {showShareOptions && (
          <div className="mt-4">
            <SocialShare
              url={InterviewData?.interview_link}
              title="Share Interview Link with Candidate"
            />
          </div>
        )}

        {/* Divider */}
        <div className="m-12 w-full mb-4">
          <hr className="w-[80%] border-gray-300" />
        </div>

        <div className="items-center text-center flex flex-col">
          <h1 className="w-full sm:w-[680px] h-[46px] font-roboto text-[24px] leading-[46px] font-bold">
            QR Code
          </h1>
          <p className="w-full sm:w-[427px] h-[30px] font-openSans text-[16px] leading-[30px] font-normal text-gray-600 mb-4">
            Candidates can scan this QR Code to access the interview
          </p>


          {/* QR Code Image */}
          {isLoading ? (
            <div className="w-[200px] h-[200px] bg-gray-100 animate-pulse rounded-md mt-4 mx-auto" />
          ) : (
            InterviewData?.qr_code_base64 && (
              <div className="w-[200px] h-[200px] bg-white flex items-center justify-center rounded-md mt-4 shadow-xl mx-auto">
                <QRCode
                  className="w-[200px] h-[200px] shadow-lg p-4"
                  width={216}
                  height={222}
                  // value={InterviewData.qr_code_base64 }
                  value={InterviewData?.interview_link || ''}
                />
              </div>
            )

          )}


          <div className="flex flex-row items-center justify-center">
            <button
              onClick={handleDownloadQR}
              disabled={!InterviewData?.interview_link}
              className="flex items-center justify-center gap-2 sm:gap-3 font-roboto text-[14px] sm:text-[16px] md:text-[18px] font-bold w-[90%] sm:w-[180px] md:w-[212px] h-[50px] sm:h-[60px] md:h-[65px] rounded-[14px] bg-[#1E4B8E] mt-8 sm:mt-11 text-white px-4 sm:px-6"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" /> Download
            </button>
            <div className="ml-2 mt-10">
              <Share2
                onClick={QrToogleShareOptions}
                className="text-gray-600 bg-slate-200 rounded-full h-[36px] w-[34px] p-1"
              />
            </div>
          </div>
          {showQrSharedOptions && (
            <div className="mt-4">
              <SocialShare
                url={InterviewData?.interview_link}
                title="Share Interview Link with Candidate"
              />
            </div>
          )}
        </div>
      </div>
    </InterviewLayout>
  );
}
