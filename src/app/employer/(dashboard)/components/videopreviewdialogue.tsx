'use client';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function Videopreviewdialogue({
  videoURL,
  onClose,
}: {
  videoURL: string | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!videoURL} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-full p-0 overflow-hidden">
        {videoURL && (
          <video
            src={videoURL}
            controls
            autoPlay
            className="w-full h-auto rounded-md"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
