import { create } from 'zustand';

interface PlayerState {
  activeChat: boolean;
  toggleChat: () => void;
}

const usePlayerStore = create<PlayerState>((set) => ({
  activeChat: false,
  toggleChat: () => set((state) => ({ activeChat: !state.activeChat })),
}));

export default usePlayerStore;
