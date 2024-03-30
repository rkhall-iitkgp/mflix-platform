import { Incoming } from '@/Stores/PlayerStore';
import style from './PartyChat.module.css';

export default function IncomingMsg({ username, text, time }: Incoming) {
  return (
    <div className={style.from_them_container}>
      <span>{username}</span>
      <p className={style.from_them}>{text}</p>
      <span style={{ display: 'none' }}>{time}</span>
    </div>
  );
}
