import { Container, Group, Stack } from '@mantine/core'
import Image from 'next/image'
import React from 'react'
import Bot from '@/assets/images/bot.png'
import { createStyles } from '@mantine/styles'
import SendIcon from '@/assets/icons/send.svg'
import DownIcon from '@/assets/icons/down.svg'

export default function Chatbot() {
    const { classes, cx } = styles();
    const [show, setShow] = React.useState(false);
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
                    <div className={classes.messages}>
                        <p className={classes.sent}>Sent message</p>
                        <p className={classes.received}>Received message</p>
                    </div>
                    <Group className={classes.messageInput}>
                        <input type="text" placeholder='Enter your message...' className={classes.input} />
                        <Container className={classes.sendIcon}>
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
        zIndex: 500
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
        background: "linear-gradient(149.93deg, #580099 8.93%, #9441D0 50.35%, #580099 84.24%)",
        justifyContent: "space-between !important",
        p: {
            margin: 0,
        },
        h2: {
            margin: 0,
        }
    },
    messageInput: {
        padding: "0 0.5rem 0 0",
        borderTop: "1px solid #ADADAD",
    },
    body: {
        backgroundColor: "#333333"
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
        backgroundColor: "#6034DF",
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
        justifyContent: "flex-end",
        flexDirection: "column",
        gap: "1rem",
        "::-webkit-scrollbar": {
            display: "none"
        },
    },
    sent: {
        alignSelf: "flex-end",
        backgroundColor: "#6034DF",
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