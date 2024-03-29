import { create } from 'zustand'

type State = {
    _id: string;
    name: string;
    email: string;
    dob: string;
    phone: number;
    payments: any[];
    userProfiles: any[];
    activeLogins: string[];
}
type Action = {
    updateUser: (newUser: Partial<State>) => void;
}
const useLoginStore = create<State & Action>((set) => ({
    _id: "",
    name: "",
    email: "",
    dob: "",
    phone: 0,
    payments: [],
    userProfiles: [],
    activeLogins: [],
    updateUser: (newUser) => set(() => ({ ...newUser })),

}))
export default useLoginStore;

