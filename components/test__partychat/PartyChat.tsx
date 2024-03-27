'use client';

import themeOptions from '@/utils/colors';
import { Container, Flex, RadioIcon, Stack, Switch, Text } from '@mantine/core';
import { createStyles } from '@mantine/styles';
import React, { use, useEffect, useRef, useState } from 'react';
import { ws } from './content';

type IMessage = {
  type: string;
  text: string;
  username?: string;
};

type User = {
  clientId: string;
  username: string;
};

const colors = {
  white: '#fff',
  dull_white: '#fff9',
  primary: '#828282',
};

export default function PartyChat() {
  const [username, setUsername] = useState('');

  const messageRef = useRef<HTMLInputElement>(null);

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    switch (data.type) {
      case 'room_created':
        // TODO : Send Link to Email
        alert(`Room created. Code: ${data.roomCode}`);
        break;
      case 'joined_room':
        // TODO Handle addition to both parties
        setMessageChain((prev) => [
          ...prev,
          { type: 'user_joined', text: `${data.username} has joined the room.` },
        ]);
        break;
      case 'error':
        alert(data.message);
        break;
      case 'chat':
        if (data.content.username != username)
          setMessageChain((prev) => [
            ...prev,
            {
              type: 'incoming_message',
              text: data.content.content,
              username: data.content.username,
            },
          ]);
        else {
          setMessageChain((prev) => [
            ...prev,
            {
              type: 'outgoing_message',
              text: data.content.content,
              username: username!,
            },
          ]);
        }
        break;
      case 'button_state_change':
        const button = document.querySelector(`[data-button="${data.button}"]`);
        // Apply the active class based on the button's state received from the server
        // if (data.isActive) {
        //   button.classList.add('active');
        // } else {
        //   button.classList.remove('active');
        // }
        break;
      case 'restrict_buttons':
        alert('Buttons restricted');
        const res_button = document.querySelector(`[data-button="${data.button}"]`);
        // res_button.disabled = true;
        break;
      case 'unrestrict_buttons':
        alert('Buttons unrestricted');
        // buttons.forEach((button) => {
        // button.disabled = false;
        // });
        break;
      case 'user_list':
        if (data.isCreator) {
          console.log(data);
          setUserList(data.users);
        }
        break;
      case 'user_left': // Update user list when a user leaves
        if (data.isCreator) {
          setUserList((prev) => prev.filter((user) => user.username != username));
        }
        console.log(`${data.username} has left the room.`);
        break;
      // Handle other types of messages here
    }
  };

  const useStyles = createStyles({
    main: {
      color: 'white',
      backgroundColor: themeOptions.color.background,
      borderRadius: '1rem',
      overflow: 'hidden',
      width: '30rem',
    },
    tab: {
      textAlign: 'center',
      width: '100%',
      borderBottom: `2px solid ${colors.dull_white}`,
      cursor: 'pointer',
    },
    activeTab: {
      textAlign: 'center',
      width: '100%',
      borderBottom: `2px solid ${colors.white}`,
      cursor: 'pointer',
    },
  });

  const { classes } = useStyles();

  const [activeTab, setActiveTab] = useState(0);

  const [messageChain, setMessageChain] = useState<IMessage[]>([]);
  const [userList, setUserList] = useState<User[]>([]);

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <button
          onClick={() => {
            let name = prompt('Enter username');
            setUsername(name!);
            ws.send(JSON.stringify({ type: 'create_room' }));
          }}
        >
          Create watch party
        </button>
        <button
          onClick={() => {
            let name = prompt('Enter username');
            setUsername(name!);
            const roomCode = prompt('enter room code:')!.trim();
            ws.send(JSON.stringify({ type: 'join_room', roomCode: roomCode, username: name }));
          }}
        >
          Join watch party
        </button>
        <div>
          <ul>
            {userList.map((user) => (
              <button
                onClick={() => {
                  ws.send(
                    JSON.stringify({
                      type: 'kick_user',
                      clientId: user.clientId,
                      username: user.username,
                    })
                  );
                }}
              >
                {user.username}
              </button>
            ))}
          </ul>
        </div>
        <button
          onClick={() => {
            console.log({ userList, username });
            // ws.send(
            //   JSON.stringify({
            //     type: 'leave_room',
            // clientId: userList.find((user) => user.username == username)!.clientId,
            //   })
            // );
          }}
        >
          Leave Room
        </button>
      </div>
      <Container px={32} py={16} size={'xs'} className={classes.main}>
        <Flex>
          <Container
            onClick={() => {
              setActiveTab(0);
            }}
            px={0}
            py={16}
            className={`${activeTab == 0 ? classes.activeTab : classes.tab}`}
          >
            Chat
          </Container>
          <Container
            onClick={() => {
              setActiveTab(1);
            }}
            px={0}
            py={16}
            className={`${activeTab == 1 ? classes.activeTab : classes.tab}`}
          >
            Settings
          </Container>
        </Flex>
        {activeTab == 1 && (
          <>
            <Container py={16}>
              <Text
                style={{
                  color: 'purple',
                  fontSize: '2rem',
                }}
              >
                Send Invite Code
              </Text>
              <Text style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                Use this code to invite others and watch together
              </Text>
              <Flex align={'stretch'} gap={16} py={16} style={{ borderBottom: '2px solid white' }}>
                <Text px={16} style={{ backgroundColor: 'red', width: 'fit-content' }}>
                  1234
                </Text>
                <button>COPY</button>
              </Flex>
            </Container>
            <Container py={16} style={{ borderBottom: '2px solid white', paddingBottom: '2rem' }}>
              <Text
                style={{
                  color: 'purple',
                  fontSize: '2rem',
                }}
              >
                Watch Controls
              </Text>
              <Switch labelPosition="left" color="purple" label="Anyone can pause video" />
            </Container>
            <Container py={16} style={{ borderBottom: '2px solid white', paddingBottom: '1rem' }}>
              <Text
                style={{
                  color: 'purple',
                  fontSize: '2rem',
                }}
              >
                Details
              </Text>
              <Stack>
                <UserListItem name="User 1" isHost />
                <UserListItem name="User 2" isHost={false} />
                <UserListItem name="User 3" isHost={false} />
              </Stack>
            </Container>
            <button style={{ marginInline: 'auto' }}>End Watch Party</button>
          </>
        )}
        {activeTab == 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {messageChain.map((message, index) => {
              if (message.type == 'user_joined')
                return <UserJoined key={index} message={message.text} />;
              else if (message.type == 'incoming_message')
                return <IncomingMessage key={index} message={message} />;
              else if (message.type == 'outgoing_message')
                return <OutgoingMessage key={index} message={message} />;
            })}
            <div style={{ display: 'flex' }}>
              <input ref={messageRef} style={{ width: '100%' }} placeholder="Message" />
              <button
                onClick={() => {
                  if (messageRef.current) {
                    ws.send(
                      JSON.stringify({
                        type: 'chat',
                        content: messageRef.current.value,
                        username: username,
                      })
                    );
                    messageRef.current.value = '';
                  }
                }}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

const UserListItem = ({ name, isHost }: { name: string; isHost: boolean }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          alignContent: 'center',
        }}
      >
        <div
          style={{
            width: '2rem',
            aspectRatio: '1 / 1',
            backgroundColor: 'white',
            borderRadius: '100%',
          }}
        ></div>
        <div>{name}</div>
      </div>
      {isHost ? (
        <div
          style={{
            fontSize: '0.8rem',
            color: 'white',
            backgroundColor: 'purple',
            padding: '0.1rem 0.4rem',
          }}
        >
          HOST
        </div>
      ) : (
        <div
          style={{
            fontSize: '0.8rem',
            color: 'white',
            fontWeight: '700',
            backgroundColor: 'orangered',
            padding: '0.1rem 0.4rem',
          }}
        >
          Remove
        </div>
      )}
    </div>
  );
};

const IncomingMessage = ({ message }: { message: IMessage }) => {
  return (
    message && (
      <div
        style={{
          display: 'flex',
          alignItems: 'start',
          gap: '1rem',
          width: '80%',
        }}
      >
        <div
          style={{
            width: '3rem',
            aspectRatio: '1 / 1',
            backgroundColor: 'white',
            borderRadius: '100%',
            marginTop: '0.5rem',
          }}
        ></div>
        <div
          style={{
            background: '#333',
            padding: '0.5rem 1rem',
          }}
        >
          <h3 style={{ color: 'blue', fontWeight: 'bold', padding: '0', margin: '0' }}>
            {message.username}
          </h3>
          <p style={{ padding: '0', margin: '0' }}>{message.text}</p>
          <p style={{ textAlign: 'right', fontSize: '0.8rem', fontWeight: 'bold' }}>04:00am</p>
        </div>
      </div>
    )
  );
};

const OutgoingMessage = ({ message }: { message: IMessage }) => {
  return (
    message && (
      <div
        style={{
          width: '80%',
          background: '#200',
          padding: '0.5rem 1rem',
          alignSelf: 'end',
        }}
      >
        <p style={{ padding: '0', margin: '0' }}>{message.text} </p>
        <p style={{ textAlign: 'right', fontSize: '0.8rem', fontWeight: 'bold' }}>7:50pm</p>
      </div>
    )
  );
};

const UserJoined = ({ message = '' }) => {
  return (
    <p style={{ textAlign: 'center', color: 'red', fontSize: '0.9rem', fontWeight: 'bold' }}>
      {message}
    </p>
  );
};
