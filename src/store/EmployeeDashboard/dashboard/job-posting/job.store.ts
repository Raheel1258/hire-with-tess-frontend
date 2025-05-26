import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface JobProps {

    searchTerm:string,
    postedjobdata:string,
    isDialogOpen: boolean,

    setSearchTerm: (value: string) => void;
    setpostedjobdata: (value: string) => void;
    setIsDialogOpen: (value: boolean) => void;
}
const JobStore = create<JobProps>()(
    devtools(
        (set) => ({
            isDialogOpen:false,
            postedjobdata:"",
            searchTerm:"",

            setSearchTerm:(value) => set({searchTerm: value}),
            setpostedjobdata:(value) => set({postedjobdata: value}),
            setIsDialogOpen:(value) => set({isDialogOpen: value})

        }),

    )
)

export default JobStore;