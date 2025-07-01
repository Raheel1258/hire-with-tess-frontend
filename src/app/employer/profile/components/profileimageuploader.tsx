'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props {
  currentImage: string | null;
  onImageChange: (file: File | null) => void;
}

export default function ProfileImageUploader({ currentImage, onImageChange }: Props) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
      onImageChange(file);
    }
  };

  return (
    <div className="relative w-28 h-28 rounded-full border shadow">
      <Image
        src={previewImage || currentImage || '/default-avatar.png'}
        alt="Profile"
        layout="fill"
        objectFit="cover"
        className="rounded-full"
      />
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
      <Button
        type="button"
        variant="secondary"
        size="icon"
        className="absolute bottom-0 right-0 w-8 h-8 rounded-full"
        onClick={() => fileInputRef.current?.click()}
      >
        <Camera className="w-4 h-4" />
      </Button>
    </div>
  );
}
