import { Container, Group, Stack } from '@mantine/core';
import Image from 'next/image';
import React, { useEffect } from 'react';
import Bot from '@/assets/images/bot.png';
import { createStyles } from '@mantine/styles';
import SendIcon from '@/assets/icons/send.svg';
import DownIcon from '@/assets/icons/down.svg';
import { useRef } from 'react';

export default function Chatbot() {
  const { classes, cx } = styles();
  const [show, setShow] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState<
    {
      message: string;
      type: 'sent' | 'received';
    }[]
  >([]);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      const handleKeyPress = (event: KeyboardEvent) => {
        if (event?.key === 'Enter' && input.value.trim() !== '') {
          sendMessage();
          event.preventDefault(); // Prevent default form submission
        }
      };

      input.addEventListener<"keypress">("keypress", handleKeyPress );

      // Cleanup function to remove the event listener on unmount
      return () => input.removeEventListener("keypress", handleKeyPress);
    }
  }, [sendMessage]);

  React.useEffect(() => {
    document
      .getElementById('messages')
      ?.scrollTo(0, document.getElementById('messages')?.scrollHeight!);
  }, [messages]);

  async function sendMessage() {
    setMessages((messages) => [...messages, { message: input, type: 'sent' }]);
    setInput('');
    inputRef.current!.value = '';
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chatbot/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages((messages) => [
        ...messages,
        {
          message: (data.message as string).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
          type: 'received',
        },
      ]);
    } catch (error) {
      setMessages((messages) => [
        ...messages,
        {
          message: 'Sorry, I am not able to process your request at the moment.',
          type: 'received',
        },
      ]);
    }
  }

  return (
    <Container className={classes.chatbot}>
      {!show && (
        <Image
          src={Bot}
          alt="Chatbot"
          width={70}
          height={70}
          className={classes.icon}
          onClick={() => setShow(true)}
        />
      )}
      {show && (
        <Container>
          <Group className={classes.chatbotHeader}>
            <Group>
              <Image src={Bot} alt="Chatbot" width={50} height={50} className={classes.icon} />
              <Stack gap={0}>
                <p>Chat with</p>
                <h2 className={classes.heading}>Movie Bot</h2>
              </Stack>
            </Group>
            {
              <Image
                src={DownIcon}
                alt="close"
                width={30}
                height={30}
                className={classes.icon}
                onClick={() => setShow(false)}
              />
            }
          </Group>
          <Stack className={classes.body}>
            <div id="messages" className={classes.messages}>
              {/* <p className={classes.sent}>Sent message</p>
                        <p className={classes.received}>Received message</p> */}
              {messages.map((msg, i) => (
                <p
                  key={i}
                  className={cx(classes[msg.type])}
                  dangerouslySetInnerHTML={{ __html: msg.message }}
                />
              ))}
            </div>
            <Group className={classes.messageInput}>
              <input
                type="text"
                placeholder="Enter your message..."
                className={classes.input}
                value={input}
                onChange={(e) => setInput((e.target as HTMLInputElement).value)}
                ref={inputRef} // Assign the ref to the input element
                id="messageInput"
              />
              <Container className={classes.sendIcon} onClick={sendMessage}>
                <Image src={SendIcon} alt="Send" width={22} height={22} />
              </Container>
            </Group>
          </Stack>
        </Container>
      )}
    </Container>
  );
}

const styles = createStyles((theme) => ({
  chatbot: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: '2rem',
    zIndex: 500,
  },
  icon: {
    borderRadius: '50%',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  heading: {
    lineHeight: 1,
  },
  chatbotHeader: {
    padding: '1rem',
    background: 'linear-gradient(149.93deg, #580099 8.93%, #9441D0 50.35%, #580099 84.24%)',
    justifyContent: 'space-between !important',
    p: {
      margin: 0,
    },
    h2: {
      margin: 0,
    },
  },
  messageInput: {
    borderTop: '1px solid #ADADAD',
  },
  body: {
    backgroundColor: '#333333',
    width: '20rem',
  },
  input: {
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    padding: '1rem',
    color: 'white',
    '::placeholder': {
      color: '#ADADAD',
    },
  },
  sendIcon: {
    // padding: "0.7rem",
    borderRadius: '50%',
    backgroundColor: '#6034DF',
    color: 'white',
    width: '3rem',
    height: '3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icons: {
    marginLeft: '1rem',
    marginBottom: '1rem',
  },
  messages: {
    padding: '1rem',
    height: '20rem',
    overflowY: 'scroll',
    display: 'flex',
    // justifyContent: "flex-end",
    flexDirection: 'column',
    gap: '1rem',
    '::-webkit-scrollbar': {
      display: 'none',
    },
  },
  sent: {
    alignSelf: 'flex-end',
    backgroundColor: '#6034DF',
    padding: '0.5rem',
    borderRadius: '5px',
    lineHeight: '1',
    margin: '0.1rem 0',
  },
  received: {
    color: 'black',
    alignSelf: 'flex-start',
    padding: '0.5rem',
    borderRadius: '5px',
    lineHeight: '1',
    backgroundColor: '#BFBFBF',
    margin: '0.1rem 0',
  },
}));
