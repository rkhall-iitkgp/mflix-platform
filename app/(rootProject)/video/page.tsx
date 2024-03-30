"use client";

import usePlayerStore from "@/Stores/PlayerStore";
import PartyChat from "@/components/PartyChat/PartyChat";
import VideoPlayer from "@/components/VPlayer";
import { useEffect, useRef, useState } from "react";

const page = () => {
    const {
        activeChat,
        setUsername,
        appendMessage,
        toggleChat,
        username,
        setIsPlaying,
        setHost,
        setRoom,
    } = usePlayerStore();
    const [ws, setWS] = useState<WebSocket | null>(null);
    const playerRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        let socket = new WebSocket(
            `ws://${process.env.NEXT_PUBLIC_STREAMING_IP}`,
        );
        setWS(socket);

        socket.onopen = () => {
            console.log("WebSocket connected");
        };

        socket.onclose = () => {
            console.log("WebSocket disconnected");
        };

        socket.onmessage = (event: any) => {
            const data = JSON.parse(event.data);
            switch (data.type) {
                case "room_created":
                    console.log({ room_created: data });
                    alert(`Room created. Code: ${data.roomCode}`);
                    toggleChat(true);
                    setHost(true);
                    setRoom(data.roomCode);
                    console.log(activeChat);
                    appendMessage({
                        type: "notification",
                        text: `Room has been created`,
                    });
                    break;

                case "joined_room":
                    console.log({ joined_room: data });
                    appendMessage({
                        type: "notification",
                        text: `${data.username} joined the room`,
                    });
                    setHost(data.creator.username == username);
                    toggleChat(true);
                    setRoom(data.roomCode);
                    break;

                case "play_pause":
                    console.log({ play_pause: data });
                    setIsPlaying(data.isPlaying);
                    appendMessage({
                        type: "notification",
                        text: `${data.isPlaying ? "played" : "paused"} the videos`,
                    });
                    break;

                case "seek":
                    console.log(data.seekTime);
                    console.log(playerRef);
                    if (playerRef.current)
                        playerRef.current.currentTime = data.seekTime;
                    break;

                case "incoming_message":
                    console.log({ incoming_message: data });
                    appendMessage({
                        text: data.content.text,
                        type: "incoming_message",
                        username: data.content.username,
                    });
                    break;

                case "outgoing_message":
                    console.log({ outgoing_message: data });
                    appendMessage({
                        text: data.content.text,
                        type: "outgoing_message",
                    });
                    break;

                //   case 'sync_timestamp':
                //     console.log({ sync_timestamp: data });
                //     setCurrentTime(data.timestamp);
                //     break;

                case "error":
                    alert(data.message);
                    break;
            }
        };
        return () => {
            socket.close();
            setWS(null);
        };
    }, []);

    if (!ws) return;

    return (
        <div style={{ display: "flex" }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: "1 1 auto",
                }}
            >
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        let name = prompt("Enter username");
                        setUsername(name!);
                        ws!.send(
                            JSON.stringify({
                                type: "create_room",
                                username: name,
                            }),
                        );
                    }}
                >
                    Create Room
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        let name = prompt("Enter username");
                        setUsername(name!);
                        const roomCode = prompt("enter room code:")!.trim();
                        ws!.send(
                            JSON.stringify({
                                type: "join_room",
                                roomCode: roomCode,
                                username: name,
                            }),
                        );
                    }}
                >
                    Join Room
                </button>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
                <VideoPlayer
                    ref={playerRef}
                    ws={ws}
                    Mp4={false}
                    tier={""}
                    videoSrc={""}
                />
                {activeChat && <PartyChat ws={ws} />}
            </div>
        </div>
    );
};

export default page;
