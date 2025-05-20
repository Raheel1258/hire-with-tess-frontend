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
import UseDeleteProfile from '@/Routes/Employer/hooks/DELETE/DeleteProfile.hook';
import Image from 'next/image';

interface DeleteDialogueProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DeleteDialogue({ open, onOpenChange }: DeleteDialogueProps) {
    const { mutate } = UseDeleteProfile();

    const handleDelete = () => {
        mutate();
        onOpenChange(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className=' text-center'>Delete Account?</AlertDialogTitle>
                    <hr className="my-4 w-full bg-[#1E4B8E] h-[1px]" />
                    <div className='flex items-center justify-center mb-3'>
                        <Image src='/images/trash.png' alt='delete' width={100} height={100} />
                    </div>
                    <AlertDialogDescription className=' font-open-sans font-normal text-base text-center text-black'>
                        Are you sure you want to delete your Account?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <div className="flex justify-center items-center gap-2 w-full">
                        <AlertDialogCancel className='bg-[#DCDCDC] text-black font-open-sans font-normal w-40'>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button className='font-semibold w-40' onClick={handleDelete}>Yes, Delete</Button>
                        </AlertDialogAction>
                    </div>
                </AlertDialogFooter>

            </AlertDialogContent>
        </AlertDialog>


    );
}
