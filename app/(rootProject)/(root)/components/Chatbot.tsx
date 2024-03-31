import { Container, Group, Stack } from '@mantine/core'
import Image from 'next/image'
import React from 'react'
import Bot from '@/assets/images/chatbot.png'
import { createStyles } from '@mantine/styles'
import SendIcon from '@/assets/icons/send.svg'
import DownIcon from '@/assets/icons/down.svg'
import { useRef } from 'react'
import { KeyboardEvent } from 'react';
import Link from 'next/link'
import themeOptions from '@/utils/colors'
export default function Chatbot() {
    const { classes, cx } = styles();
    const [show, setShow] = React.useState(false);
    const [input, setInput] = React.useState('');
    const [messages, setMessages] = React.useState<{
        message: string,
        type: 'sent' | 'received'
    }[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);
    React.useEffect(() => {
        const input = inputRef.current;
        if (input) {
          const handleKeyPress = (event: KeyboardEvent) =>  {
            if (event.key === 'Enter' && input.value.trim() !== '') {
              sendMessage();
              event.preventDefault(); // Prevent default form submission
            }
          };

          // @ts-ignore
            input.addEventListener('keypress', handleKeyPress);

          // Cleanup function to remove the event listener on unmount
          // @ts-ignore
            return () => input.removeEventListener('keypress', handleKeyPress);
        }
      }, [sendMessage]);

    React.useEffect(() => {
        document.getElementById("messages")?.scrollTo(0, document.getElementById("messages")?.scrollHeight!);
    }, [messages])

    async function sendMessage() {
        setMessages(messages => [...messages, { message: input, type: 'sent' }])
        setInput('')
        if (inputRef.current) inputRef.current.value = '';
        try {
            const response = await fetch(`${'https://971edtce1a.execute-api.ap-south-1.amazonaws.com'}/chatbot/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: input })
            })
            const data = await response.json()
            const titleMatch = data.message.match(/\*\*(.*?)\*\*/);

        let linkMessage = ''; // Initialize linkMessage to an empty string

        if (titleMatch) {
            const movieTitle = titleMatch[1];
            const searchUrl = `/search?query=${encodeURIComponent(movieTitle)}`;

            // linkMessage = `<a id="searchLink" href="${searchUrl}" ">find more about "${titleMatch[1]}"</a>`;
            linkMessage = `<button style="border-radius: 0.5rem; background-color: ${themeOptions.color.button}; color: white; padding: 0.5rem; margin: 0.5rem 0.5rem 0.5rem 0; border: none; cursor: pointer;" onclick="window.open('${searchUrl}', '_blank')">Search ${titleMatch[1]}</button>`;
        }
        const formattedMessage = (data.message as string).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Add a line break between the formatted message and link message
        const finalMessage = `${formattedMessage}<br>${linkMessage}`;
            console.log("link: ",linkMessage)
            console.log("final Message: ",finalMessage)
            // setMessages(messages => [...messages, { message: data.message, type: 'received' }])
            setMessages(messages => [...messages, { message: finalMessage, type: 'received' }])

            // setMessages(messages => [...messages, { message: (data.message as string).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'), type: 'received' }])
        } catch (error) {
            console.log("error: ",error)
            setMessages(messages => [...messages, { message: 'Sorry, I am not able to process your request at the moment.', type: 'received' }])
        }
    }


    return (
        <Container className={classes.chatbot}>
            {!show && <Image src={Bot} alt="Chatbot" width={70} height={70} className={classes.icon} onClick={() => setShow(true)} />}
            {show && <Container>
                <Group className={classes.chatbotHeader}>
                    <Group>
                        <Image src={Bot} alt="Chatbot" width={50} height={50} className={classes.icon} />
                        <Stack gap={0}>
                            <p>Chat with</p>
                            <h2 className={classes.heading}>Movie Bot</h2>
                        </Stack>
                    </Group>
                    {<Image src={DownIcon} alt="close" width={30} height={30} className={classes.icon} onClick={() => setShow(false)} />}
                </Group>
                <Stack className={classes.body}>
                    <div id="messages" className={classes.messages}>
                        {/* <p className={classes.sent}>Sent message</p>
                        <p className={classes.received}>Received message</p> */}
                        {messages.map((msg, i) => <p key={i} className={cx(classes[msg.type])} dangerouslySetInnerHTML={{ __html: msg.message }} />)}
                    </div>
                    <Group className={classes.messageInput}>
                        <input type="text" placeholder='Enter your message...' className={classes.input} value={input} onChange={e => setInput((e.target as HTMLInputElement).value)} ref={inputRef}// Assign the ref to the input element
        id="messageInput" />
                        <Container className={classes.sendIcon} onClick={sendMessage} >
                            <Image src={SendIcon} alt="Send" width={22} height={22} />
                        </Container>
                    </Group>
                </Stack>
            </Container>}
        </Container>
    )
}

const styles = createStyles((theme) => ({
    chatbot: {
        position: 'fixed',
        bottom: 0,
        right: 0,
        margin: "2rem",
        zIndex: 500,
    },
    icon: {
        borderRadius: '50%',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
            transform: 'scale(1.1)'
        }
    },
    heading: {
        lineHeight: 1
    },
    chatbotHeader: {
        padding: "1rem",
        background: themeOptions.color.button,
        justifyContent: "space-between !important",
        p: {
            margin: 0,
        },
        h2: {
            margin: 0,
        }
    },
    premium: {
        marginRight: '1.5rem',
        height: '2.3rem',
        width: '7rem',
        display: 'flex',
        transition: '0.3s',
        alignItems: 'center',
        '&:hover': {
          background: themeOptions.color.button,
          cursor: 'pointer',
        },
        border: '2px solid',
        borderRadius: '8px',
        borderColor: themeOptions.color.smallBox,
        color: themeOptions.color.smallBox,
      },
    messageInput: {
        borderTop: "1px solid #ADADAD",
    },
    body: {
        backgroundColor: "#333333",
        width: "20rem",
    },
    input: {
        backgroundColor: "transparent",
        border: 'none',
        outline: 'none',
        padding: "1rem",
        color: "white",
        "::placeholder": {
            color: "#ADADAD"
        }
    },
    sendIcon: {
        // padding: "0.7rem",
        borderRadius: '50%',
        backgroundColor: "#00664A",
        color: "white",
        width: "3rem",
        height: "3rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    icons: {
        marginLeft: "1rem",
        marginBottom: "1rem",
    },
    messages: {
        padding: "1rem",
        height: "20rem",
        overflowY: "scroll",
        display: "flex",
        // justifyContent: "flex-end",
        flexDirection: "column",
        gap: "1rem",
        "::-webkit-scrollbar": {
            display: "none"
        },
    },
    sent: {
        alignSelf: "flex-end",
        backgroundColor: "#00664A",
        padding: "0.5rem",
        borderRadius: "5px",
        lineHeight: "1",
        margin: "0.1rem 0"
    },
    received: {
        color: "black",
        alignSelf: "flex-start",
        padding: "0.5rem",
        borderRadius: "5px",
        lineHeight: "1",
        backgroundColor: "#BFBFBF",
        margin: "0.1rem 0"
    }
}))
