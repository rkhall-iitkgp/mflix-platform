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
    subscriptionTier: {
        bill: string,
        tier: {
            description: string,
            maxResolution: number,
            name: string,
            partyWatch: boolean,
            price: number,
            tier: string,
            __v: number,
            _id: string
        }
    }

}
type Action = {
    updateUser: (newUser: Partial<State>) => void;
    clearState: () => void;
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
    subscriptionTier: {
        bill: "",
        tier: {
            description: "",
            maxResolution: 0,
            name: "",
            partyWatch: false,
            price: 0,
            tier: "",
            __v: 0,
            _id: "",
        }
    },
    updateUser: (newUser) => set(() => ({ ...newUser })),
    clearState: () => set({}),

}))
export default useLoginStore;

