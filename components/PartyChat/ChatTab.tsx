import usePlayerStore from "@/Stores/PlayerStore";
import IncomingMsg from "./IncomingMsg";
import NotifMsg from "./NotifMsg";
import OutgoingMsg from "./OutgoingMsg";
import style from "./PartyChat.module.css";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@mantine/core";
// import { ws } from '@/Stores/WSStore';
import SendIcon from "@/assets/icons/send.svg";

const ChatTab = ({ ws }: { ws: WebSocket | null }) => {
    const { messageChain, username, setChatFocus, isChatFocused } =
        usePlayerStore();
    const messageRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <div className={style.chatcontainer}>
                {messageChain.map((message, index) => {
                    switch (message.type) {
                        case "incoming_message":
                            return (
                                <IncomingMsg
                                    key={index}
                                    type={message.type}
                                    text={message.text}
                                    time="asd"
                                    username={message.username}
                                />
                            );
                        case "outgoing_message":
                            return (
                                <OutgoingMsg
                                    key={index}
                                    type={message.type}
                                    text={message.text}
                                    time="asd"
                                />
                            );
                        case "notification":
                            return (
                                <NotifMsg
                                    key={index}
                                    text={message.text}
                                    type={message.type}
                                />
                            );
                    }
                })}
            </div>
            <div className={style.inputsection}>
                <input
                    ref={messageRef}
                    type="text"
                    className={style.messageInput}
                    placeholder="Type your message"
                    onFocus={() => {
                        setChatFocus(true);
                    }}
                    onBlur={() => {
                        setChatFocus(false);
                    }}
                />
                <button
                    onFocus={() => {
                        setChatFocus(true);
                    }}
                    onBlur={() => {
                        setChatFocus(false);
                    }}
                    onClick={(e) => {
                        e.preventDefault();
                        if (
                            messageRef.current &&
                            messageRef.current.value != ""
                        ) {
                            if (ws) {
                                ws.send(
                                    JSON.stringify({
                                        type: "chat",
                                        content: messageRef.current.value,
                                        username: username,
                                    }),
                                );
                                messageRef.current.value = "";
                            }
                        }
                    }}
                    className={style.chatsend}
                >
                    <Image src={SendIcon} alt="Send" width={22} height={22} />
                </button>
            </div>
        </>
    );
};

export default ChatTab;
