import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React from 'react';

export default function Placeholder({
  onChange,
  onSubmit,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="flex justify-center w-full px-4">
      <form onSubmit={onSubmit} className="relative w-full max-w-xl sm:max-w-2xl">
        <Input
          className="w-full h-10 sm:h-[60px] md:h-[72px] font-normal bg-white rounded-full
                    placeholder:text-gray-500 pl-3 sm:pl-6 pr-12 sm:pr-20
                    text-xs sm:text-sm md:text-base lg:text-lg"
          placeholder="Describe what you need..."
          onChange={onChange}
          required={true}
        />
        <Button
          type="submit"
          className="absolute font-semibold cursor-pointer right-1.5 sm:right-1.5 top-1/2
                    transform -translate-y-1/2 h-8 sm:h-[50px] md:h-[60px] w-[80px] sm:w-[100px] md:w-[120px]
                    bg-orange-400 text-white px-2 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm md:text-base"
        >
          Generate
        </Button>
      </form>
    </div>
  );
}
