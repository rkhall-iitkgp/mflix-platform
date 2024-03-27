import style from './PartyChat.module.css';

type Props = {
  message: string;
  time: string;
};

export default function OutgoingMsg({ message, time }: Props) {
  return (
    <div className={style.from_me_container}>
      <p className={style.from_me}>{message}</p>
      <span style={{ display: 'none' }} className={style.from_me_time}>
        {time}
      </span>
    </div>
  );
}
