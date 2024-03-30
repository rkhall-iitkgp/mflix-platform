import { create } from 'zustand';

interface Base {
  text: string;
  time?: string;
}
export interface Incoming extends Base {
  username: string;
  type: 'incoming_message';
}

export interface Outgoing extends Base {
  type: 'outgoing_message';
}

export interface Notification {
  type: 'notification';
  text: string;
}

type Message = Incoming | Outgoing | Notification;

interface User {
  username: string;
  clientId: string;
}

interface PlayerState {
  activeChat: boolean;
  toggleChat: (newstate: boolean | undefined) => void;
  messageChain: Message[];
  appendMessage: (newmsg: Message) => void;
  username: string;
  setUsername: (name: string) => void;
  users: User[];
  addUser: (name: User) => void;
  removeUser: (name: User) => void;
  setUsers: (list: User[]) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  isPlaying: boolean;

  isChatFocused: boolean;
  setChatFocus: (chatFocus: boolean) => void;

  currentTime: number;
  setCurrentTime: (time: number) => void;

  isHost: boolean;
  setHost: (host: boolean) => void;

  allowedControls: boolean;
  setAllowedControls: (state: boolean) => void;

  room: string | null;
  setRoom: (str: string | null) => void;
}

const usePlayerStore = create<PlayerState>((set) => ({
  activeChat: false,
  toggleChat: (newstate) =>
    set((state) => ({ activeChat: newstate !== undefined ? newstate : !state.activeChat })),
  messageChain: [],
  appendMessage: (newmsg: Message) => {
    set((state) => ({ messageChain: [...state.messageChain, newmsg] }));
  },
  username: '',
  setUsername: (name) => set(() => ({ username: name })),
  users: [],
  setUsers: (list) => {
    set(() => ({ users: list }));
  },
  addUser: (name) => {
    set((state) => ({ users: [...state.users, name] }));
  },
  removeUser: (name) => {
    set((state) => ({ users: state.users.filter((user) => user != name) }));
  },
  isPlaying: false,
  setIsPlaying: (newstate) => {
    set(() => ({ isPlaying: newstate }));
  },
  isChatFocused: false,
  setChatFocus: (newstate) => {
    set(() => ({ isChatFocused: newstate }));
  },
  currentTime: 0,
  setCurrentTime: (newtime) => {
    set(() => ({ currentTime: newtime }));
  },

  isHost: true,
  setHost: (host) => {
    set(() => ({ isHost: host }));
  },

  room: null,
  setRoom: (str) => {
    set(() => ({ room: str }));
  },

  allowedControls: true,
  setAllowedControls: (state) => {
    set(() => ({ allowedControls: state }));
  },
}));

export default usePlayerStore;
