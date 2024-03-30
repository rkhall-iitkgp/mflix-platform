import React from 'react';
import style from './PartyChat.module.css';
import { Notification } from '@/Stores/PlayerStore';

function NotifMsg({ text }: Notification) {
  return (
    <div className={style.notifmsgcontainer}>
      <span className={style.notifmsg}>{text}</span>
    </div>
  );
}

export default NotifMsg;
