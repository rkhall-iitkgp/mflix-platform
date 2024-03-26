import React from 'react';
import style from './PartyChat.module.css';

type Props = {};

function NotifMsg({}: Props) {
  return (
    <div className={style.notifmsgcontainer}>
      <span className={style.notifmsg}>NotifMsg</span>
    </div>
  );
}

export default NotifMsg;
