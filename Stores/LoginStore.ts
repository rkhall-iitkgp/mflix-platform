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
    // updateName: (newName: State['name']) => void;
    // updateEmail: (newEmail: State['email']) => void;
    // updateDob: (newDob: State['dob']) => void;
    // updatePhone: (newPhone: State['phone']) => void;
    // updatePayments: (newPayments: State['payments']) => void;
    // updateUserProfiles: (newProfiles: State['userProfiles']) => void;
    // updateActiveLogins: (newLogins: State['activeLogins']) => void;
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
    // updateName: (name) => set(() => ({ name: name })),
    // updateEmail: (email) => set(() => ({ email: email })),
    // updateDob: (dob) => set(() => ({ dob: dob })),
    // updatePhone: (phone) => set(() => ({ phone: phone })),
    // updatePayments: (payments) => set(() => ({ payments: payments })),
    // updateUserProfiles: (profiles) => set(() => ({ userProfiles: profiles })),
    // updateActiveLogins: (logins) => set(() => ({ activeLogins: logins }))
}))
export default useLoginStore;