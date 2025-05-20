import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface Overviewprops {
    aiResult: number;
    selectedCandidate: string,
    analyzingInterviewId: string,
    aiReportDialogOpen: boolean,
    isDialogOpen: boolean

    setAIResult: (value: number) => void;
    setSelectedCandidate: (value: string) => void;
    setAnalyzingInterviewId: (value: string) => void;
    setAIReportDialogOpen: (value: boolean) => void;
    setIsDialogOpen: (value: boolean) => void;

}

const OverviewStore = create<Overviewprops>()(
    devtools(
        (set) => ({
            aiResult:"",
            selectedCandidate:"",
            analyzingInterviewId:"",
            aiReportDialogOpen:false,
            isDialogOpen: false,

            setAIResult: (value) => set({ aiResult: value }),
            setSelectedCandidate:(value) =>set({selectedCandidate:value}),
            setAnalyzingInterviewId:(value) => set({analyzingInterviewId:value}),
            setAIReportDialogOpen:(value) => set({aiReportDialogOpen:value}),
            setIsDialogOpen:(value) => set({isDialogOpen:value})

        }),

    )
)

export default OverviewStore;