'use client';

import { useEffect, useRef } from 'react';
import style from './PartyChat.module.css';
import { Switch } from '@mantine/core';
import UserListItem from './UserListItem';

const SettingsTab = () => {
  const linkRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (linkRef.current) {
      linkRef.current.value = 'https://meet.google.com/abc-defg-hij';
    }
  });

  const copyLink = () => {
    if (linkRef.current) navigator.clipboard.writeText(linkRef.current.value);
  };
  return (
    <>
      <>
        <div className={style.invite}>
          <h3 className={style.heading}>Send Invite Link</h3>
          <p className={style.paragraph}>Use this link to invite others and watch together</p>
          <div>
            <input disabled ref={linkRef} className={style.copy} />
            <button onClick={copyLink}>Copy</button>
          </div>
        </div>
        <div className={style.controls}>
          <h3 className={style.heading}>Watch Controls</h3>
          <Switch labelPosition="left" color="purple" label="Anyone can pause video" />
        </div>
        <div className={style.details}>
          <h3 className={style.heading}>Details</h3>
          <div className={style.userlist}>
            <UserListItem isCreator={true} user={{ username: 'Rohan', clientId: 'id_rohan' }} />
            <UserListItem isCreator={false} user={{ username: 'Tejas', clientId: 'id_tejas' }} />
            <UserListItem
              isCreator={false}
              user={{ username: 'Shaukat', clientId: 'id_shaukat' }}
            />
          </div>
        </div>
        <div className={style.endparty}>
          <button>End Watch Party</button>
        </div>
      </>
    </>
  );
};

export default SettingsTab;