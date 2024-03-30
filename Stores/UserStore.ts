import { create } from 'zustand'

type State = {
    _id: string;
    name: string;
    index: number;
}
type Action = {
    updateUser: (newUser: Partial<State>) => void;
    clearState: () => void;
}
const useUserStore = create<State & Action>((set) => ({
    _id: "",
    name: "",
    index: 0,
    updateUser: (newUser) => set(() => ({ ...newUser })),
    clearState: () => set({}),

}))
export default useUserStore;

