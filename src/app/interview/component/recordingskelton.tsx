import { Skeleton } from '@/components/ui/skeleton';
import { useSpeechRecognition } from 'react-speech-recognition';

export default function RecordingSkelton(){
  const {  browserSupportsSpeechRecognition } = useSpeechRecognition();

 if (!browserSupportsSpeechRecognition) {
  return (
    <div className="w-full">
     <div>
      <Skeleton className="w-full h-10 mb-4" />
     </div>
     <Skeleton className="h-[125px] w-full rounded-xl" />
     <div className=" flex flex-col mt-8 items-center justify-center">
      <Skeleton className="w-20 h-20 rounded-full z-10 relative" />
     </div>
    </div>
  );
 }

}