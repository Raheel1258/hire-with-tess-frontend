import postedJobProps from '@/Types/EmployerDashboard/Dashboard/Job/podtedjob.type';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface JobProps {

    searchTerm:string,
    postedjobdata:postedJobProps,
    isDialogOpen: boolean,
    selectedCandidate: string,

    setSearchTerm: (value: string) => void;
    setpostedjobdata: (value: postedJobProps) => void;
    setIsDialogOpen: (value: boolean) => void;
    setSelectedCandidate: (value: string) => void;
}
const JobStore = create<JobProps>()(
    devtools(
        (set) => ({
            isDialogOpen:false,
            postedjobdata:"",
            searchTerm:"",
            selectedCandidate:"",

            setSearchTerm:(value) => set({searchTerm: value}),
            setpostedjobdata:(value) => set({postedjobdata: value}),
            setIsDialogOpen:(value) => set({isDialogOpen: value}),
            setSelectedCandidate:(value) => set({selectedCandidate: value})

        }),

    )
)

export default JobStore;