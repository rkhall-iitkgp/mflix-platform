import style from './PartyChat.module.css';

type IUser = {
  username: string;
  clientId: string;
};

const UserListItem = ({ isCreator, user }: { user: IUser; isCreator: boolean }) => (
  <div className={style.user}>
    <div className={style.profile}></div>
    <p className={style.username}>{user.username}</p>
    {isCreator ? (
      <button>host</button>
    ) : (
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log(user.clientId);
          // ws.send(JSON.stringify({ type: 'kick_user', ...user }));
        }}
        className={style.action}
      >
        remove
      </button>
    )}
  </div>
);

export default UserListItem;
