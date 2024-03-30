import { Outgoing } from '@/Stores/PlayerStore';
import style from './PartyChat.module.css';

export default function OutgoingMsg({ text, time }: Outgoing) {
  return (
    <div className={style.from_me_container}>
      <p className={style.from_me}>{text}</p>
      <span style={{ display: 'none' }} className={style.from_me_time}>
        {time}
      </span>
    </div>
  );
}
