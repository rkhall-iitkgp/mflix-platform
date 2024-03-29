import IncomingMsg from './IncomingMsg';
import NotifMsg from './NotifMsg';
import OutgoingMsg from './OutgoingMsg';
import style from './PartyChat.module.css';

const ChatTab = () => {
  return (
    <>
      <div className={style.chatcontainer}>
        <IncomingMsg message="asd" time="asd" username="asd" />
        <NotifMsg />
        <OutgoingMsg message="asd" time="asd" />
      </div>
      <div className={style.inputsection}>
        <input type="text" className={style.messageInput} placeholder="Type your message" />
        <button className={style.chatsend}>Send</button>
      </div>
    </>
  );
};

export default ChatTab;
