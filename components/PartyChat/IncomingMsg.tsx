import style from './PartyChat.module.css';

type Props = {
  username: string;
  message: string;
  time: string;
};

export default function IncomingMsg({ username, message, time }: Props) {
  return (
    <div className={style.from_them_container}>
      <span>{username}</span>
      <p className={style.from_them}>{message}</p>
      <span style={{ display: 'none' }}>{time}</span>
    </div>
  );
}
