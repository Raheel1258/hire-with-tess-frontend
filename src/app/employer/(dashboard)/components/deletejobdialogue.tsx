'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

interface DeleteJobDialogueProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobTitle?: string;
  onConfirm: () => void;
  isPending?: boolean;
}

export default function DeleteJobDialogue({
  open,
  onOpenChange,
  jobTitle,
  onConfirm,
  isPending = false,
}: DeleteJobDialogueProps) {
  const handleDelete = () => {
    onConfirm();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">Delete Job?</AlertDialogTitle>
          <hr className="my-4 w-full bg-[#1E4B8E] h-[1px]" />
          <div className="flex items-center justify-center mb-3">
            <Image
              src="/images/trash.png"
              alt="delete job"
              width={56}
              height={69}
              className="h-14 w-auto"
            />
          </div>
          <AlertDialogDescription className="font-normal text-base text-center text-black">
            {jobTitle ? (
              <>
                Are you sure you want to delete <span className="font-semibold">{jobTitle}</span>?
                This action cannot be undone.
              </>
            ) : (
              'Are you sure you want to delete this job? This action cannot be undone.'
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex justify-center items-center gap-2 w-full">
            <AlertDialogCancel
              disabled={isPending}
              className="bg-[#DCDCDC] text-black font-normal w-40"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                className="font-semibold w-40"
                onClick={handleDelete}
                disabled={isPending}
              >
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Yes, Delete'}
              </Button>
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
