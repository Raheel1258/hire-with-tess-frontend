import Image from 'next/image';
import React from 'react';

interface NoQuestionProps {
  imageSrc?: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export default function NoQuestion({
  imageSrc = '/images/Frame.png',
  title = 'No Job Description Available!',
  description = 'Kindly Check on the Generate below to generate Job Description',
  children,
}: NoQuestionProps) {
  return (
    <div className=" flex items-center justify-center px-4 sm:px-6">
      <div className="flex flex-col items-center text-center space-y-4">
        <Image
          className="mt-20 mb-10"
          src={imageSrc}
          alt={title}
          width={157}
          height={171}
        />
        <h1 className="text-[24px] leading-[24px] font-bold font-[roboto]">{title}</h1>
        <p className="text-gray-600 text-[16px] leading-[30px] font-normal font-openSans  ">
          {description}
        </p>
        {children}
      </div>
    </div>
  );
}
