import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface OutputCardProps {
    questions: string[];
    avatarSrc?: string;
    editIconSrc?: string;
    buttonIconSrc?: string;
    buttonText?: string;
    onGenerateClick?: () => void;
}

export default function OutputCard({
    questions,
    avatarSrc = "/images/AIAvatar.png",
    editIconSrc = "/images/edit.png",
    buttonIconSrc = "/images/Vector.png",
    buttonText = "Generate",
    onGenerateClick
}: OutputCardProps) {
    return (
        <Card className="mt-4 mx-6 p-4">
            <div className="flex flex-col space-y-4 w-full">
                {questions.map((item, index) => (
                    <div key={index} className="flex text-black gap-4 items-center">
                        <Image src={avatarSrc} alt="bot" width={40} height={40} />
                        <Input placeholder={item} className="w-full" />
                        <Image src={editIconSrc} alt="edit" width={40} height={40} />
                    </div>
                ))}
                {onGenerateClick && (
                    <Button onClick={onGenerateClick} className="flex items-center gap-2">
                        <Image src={buttonIconSrc} alt="button icon" width={20} height={20} />
                        {buttonText}
                    </Button>
                )}
            </div>
        </Card>
    );
}
