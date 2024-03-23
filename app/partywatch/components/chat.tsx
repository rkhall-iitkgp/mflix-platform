import React from 'react';
import { createStyles } from '@mantine/styles';
import { useState } from 'react';
import Image from 'next/image';
import smileIcon from "../../../assets/Mask group.svg";
import sendIcon from "../../../assets/send.svg";
import Chatboxleft from './chatboxleft';
import Chatboxright from './chatboxright';

const useStyles = createStyles((theme, _params, getRef) => {
    return {
        icon: {
            backgroundColor: "#271F2D",
            height: "55px",
            width: "10%",
            padding: "10px"
        },
        body: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: "#0B0212",
            width: "100%"
        },
        chattingarea: {
            width: "25%",
            height: 'fit-content',
            flexGrow: 1,
            overflowY: 'auto',
            minHeight: 0,
            paddingBottom: "50px",
            position: "absolute",
            backgroundColor: "#0B0212",
        },
        footer: {
            display: 'flex',
            alignItems: 'center',
            width: "25%",
            borderTop: '1px solid #ffffff',
            backgroundColor: "#0B0212",
            position: 'fixed',
            left: 0,
            bottom: 0,
        },
        input: {
            color: "#ffffff",
            padding: "15px",
            marginLeft: '2px',
            marginRight: '2px',
            width: "80%",
            backgroundColor: "#271F2D !important",
            border: "none",
        },
    };
});

const Chat = () => {
    const { classes } = useStyles();
    const [message, setMessage] = useState('');

    const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const sendMessage = (event: any) => {
        event.preventDefault(); // Prevent form submission from refreshing the page
        console.log('Sending message:', message);
        // Logic to send message goes here
        setMessage('');
    };

    return (
        <div className={classes.body}>
            <div className={classes.chattingarea}>
                <Chatboxleft user="john" message="lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum" time="9:42" />
                {/* Add other messages here */}
                <Chatboxright message={message} time="9:42" />
            </div>
            <form onSubmit={sendMessage}>
                <div className={classes.footer}>
                    <Image src={smileIcon} alt="" className={classes.icon} />
                    <input
                        value={message}
                        onChange={handleMessageChange}
                        placeholder="Type your message here..."
                        className={classes.input}
                    />
                    <Image src={sendIcon} alt="" className={classes.icon} />
                    <button onClick={sendMessage} style={{ display: 'none', cursor: "pointer" }} />


                </div>
            </form>
        </div>
    );
}

export default Chat;
