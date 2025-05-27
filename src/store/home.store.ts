import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'

interface inputState {
    input: string,
    setInput: (value:string) => void

}

const useStore = create<inputState>()(
    devtools(
        persist(
            (set) => ({
                
                input: '',
                setInput: (value) => set(({ input: value }))
            }),
            { name: 'inputSatte' }
        )
    )
)

export default useStore;