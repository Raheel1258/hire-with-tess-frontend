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

import { toast } from 'sonner';

import { logoutAndRedirect } from '@/Utils/Providers/auth';



interface LogoutDialogueProps {

  open: boolean;

  onOpenChange: (open: boolean) => void;

}



export default function LogoutDialogue({ open, onOpenChange }: LogoutDialogueProps) {

  const handleLogout = () => {

    onOpenChange(false);

    toast.success('Logout successfully');

    logoutAndRedirect();

  };



  return (

    <AlertDialog open={open} onOpenChange={onOpenChange}>

      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle className="text-center">Logout?</AlertDialogTitle>

          <hr className="my-4 w-full bg-[#1E4B8E] h-[1px]" />

          <div className="flex items-center justify-center mb-3">

            <Image

              src="/images/union.png"

              alt="logout"

              width={56}

              height={69}

              className="h-14 w-auto"

            />

          </div>

          <AlertDialogDescription className="font-normal text-base text-center text-black">

            Are you sure you want to Logout?

          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <div className="flex justify-center items-center gap-2 w-full">

            <AlertDialogCancel className="bg-[#DCDCDC] text-black font-normal w-40">

              Cancel

            </AlertDialogCancel>

            <AlertDialogAction asChild>

              <Button className="font-semibold w-40" onClick={handleLogout}>

                Yes, Logout

              </Button>

            </AlertDialogAction>

          </div>

        </AlertDialogFooter>

      </AlertDialogContent>

    </AlertDialog>

  );

}

