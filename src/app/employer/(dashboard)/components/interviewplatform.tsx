import { Badge } from '@/components/ui/badge'
import React from 'react'

interface InterviewplatformProps {
    platform: string;
}

export default function Interviewplatform({platform}:InterviewplatformProps) {

    switch(platform){
        case 'web_interview':
            return <Badge className=' flex items-center gap-2 bg-green-100 border-2 border-green-400 text-green-600 text-xs'>Web Interview</Badge>
        case 'phone_interview':
            return <Badge className=' flex items-center gap-2 bg-orange-100 border-2 border-[#f7941D] text-orange-600 text-xs'>Phone Interview</Badge>
        default:
            return <Badge className=' flex items-center gap-2 bg-gray-300 border-2 border-black text-black text-xs'>Not Submitted</Badge>
    }


}



