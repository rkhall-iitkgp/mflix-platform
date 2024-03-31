"use client";

import { Stack, Skeleton } from "@mantine/core";
import NextImage from "next/image";
import themeOptions from "@/utils/colors";
import { createStyles } from "@mantine/styles";
// import SimilarMovies from '@/components/MovieDetails/SimilarMovies';
import Footer from "../../(root)/components/Footer";
import Navbar from "../../(root)/components/Navbar";
import searchMsApiUrls from "../../api/searchMsApi";
import BgImage from "@/assets/images/bg-home.png";
import MovieContent from "@/components/MovieDetails/MovieContent";
// import { ScrollArea } from '@mantine/core'
import { useEffect, useRef, useState } from "react";
import useLoginStore from "@/Stores/LoginStore";
import Movies from "@/assets/icons/movies.svg";
import Section from "@/app/(rootProject)/(root)/components/Section";
import Mixpanel from "@/components/Mixpanel";
import usePlayerStore from "@/Stores/PlayerStore";
import VideoPlayer from "@/components/VPlayer";
import PartyChat from "@/components/PartyChat/PartyChat";
import { ToastContainer, toast } from "react-toastify";
import { incrementArray } from "@/utils/mixpanelutils";
import PartyWatchModal from "@/components/PartyWatchModal";

const WS_URL = `ws://${process.env.NEXT_PUBLIC_STREAMING_IP}`;

export default function MovieDetails({ params }: { params: { id: string } }) {
    const url = searchMsApiUrls();
    const user = useLoginStore.getState();
    const [loading, setLoading] = useState(true);
    const [movieData, setMovieData] = useState<any>({});
    const [similarMoviesData, setSimilarMoviesData] = useState([]);
    const state = useLoginStore.getState();
    const [videoSrc, setVideoSrc] = useState("");
    const [Mp4, setMp4] = useState(false);
    const {
        activeChat,
        setUsername,
        appendMessage,
        toggleChat,
        username,
        setIsPlaying,
        setHost,
        openModal,
        setRoom,
    } = usePlayerStore();
    const [ws, setWS] = useState<WebSocket | null>(null);
    const playerRef = useRef<HTMLVideoElement>(null);
    const Usertier = useLoginStore((state) => state.subscriptionTier.tier.tier);

    const styles = createStyles(() => ({
        streaming: {
            width: "100%",
            height: "98vh",
            marginTop: "45px",
            border: "1px solid #fff",
        },
        similarmovies: {
            paddingLeft: "80px",
            margin: 0,
            fontSize: themeOptions.fontSize.xl,
        },
        carousal: {
            // marginTop: '-100px',
        },
        bgContainer: {
            position: "fixed",
            top: 0,
            width: "100%",
            height: "100vh",
            // zIndex: -10,
            overflow: "hidden",
        },
        bgImage: {
            opacity: 0.25,
            zIndex: -20,
        },
    }));

    const { classes } = styles();

    const connectWebSocket = () => {
        const websocket = new WebSocket(WS_URL);
        websocket.onopen = () => console.log("WebSocket Connected");
        websocket.onclose = () => console.log("WebSocket Disconnected");
        websocket.onerror = (error) => console.log("WebSocket Error: ", error);
        websocket.onmessage = (event: any) => {
            const data = JSON.parse(event.data);
            switch (data.type) {
                case "room_created":
                    console.log({ room_created: data });
                    alert(`Room created. Code: ${data.roomCode}`);
                    toggleChat(true);
                    setHost(true);
                    setRoom(data.roomCode);
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

        setWS(websocket);
        return websocket;
    };

    const createRoom = () => {
        if (!user.name) return;
        const websocket = ws || connectWebSocket();
        websocket.onopen = () => {
            websocket.send(
                JSON.stringify({
                    type: "create_room",
                    username: user.name,
                }),
            );
        };
    };

    const joinRoom = (code: string) => {
        if (!user.name) return;
        const websocket = ws || connectWebSocket();
        websocket.onopen = () => {
            websocket.send(
                JSON.stringify({
                    type: "join_room",
                    username: user.name,
                    roomCode: code,
                }),
            );
            console.log("join room");
        };
    };

    useEffect(() => {
        const id = params.id;
        // const user_id = state.userProfiles[0]._id;
        if (state.userProfiles.length > 0) {
            var user_id = state.userProfiles[0]._id;
        } else {
            var user_id = null;
        }
        const getMovieDetails = async () => {
            const res = await (
                await fetch(`${url}/movies/${id}`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId: user_id }),
                })
            ).json();
            setMovieData(res.result);
            const res1 = await (
                await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/link/${id}`,
                    {
                        method: "GET",
                        credentials: "include",
                    },
                )
            ).json();
            console.log("res11", res1);
            if (res1.success === false) {
                console.log("res1.message", res1.message);
                toast.error(res1.message);
                setMp4(true);
                setVideoSrc(res1?.result);
            } else {
                setVideoSrc(res1?.result?.uploadurl?.vidsrc);
                setMp4(false);
            }

            Mixpanel.track("Search Movie Details", {
                title: res.result.title,
                genres: res.result.genres,
                cast: res.result.cast,
                released: res.result.released,
                languages: res.result.languages,
                directors: res.result.directors,
                writers: res.result.writers,
                year: res.result.year,
                tier: res.result.tier,
            });

            if (user._id) {
                Mixpanel.identify(user._id);
                Mixpanel.people.increment("Total Movies Watched", 1);
                Mixpanel.people.append("Watch History", {
                    movie_title: res.result.title,
                    Timestamp: new Date().toISOString(),
                });
                Mixpanel.people.increment(
                    user._id,
                    incrementArray(res.result.genres, "genre"),
                );
                Mixpanel.people.increment(
                    user._id,
                    incrementArray(res.result.languages, "language"),
                );
                Mixpanel.people.increment(
                    user._id,
                    incrementArray(res.result.directors, "director"),
                );
                Mixpanel.people.increment(
                    user._id,
                    incrementArray(res.result.writers, "writer"),
                );
                Mixpanel.people.increment(
                    user._id,
                    incrementArray(res.result.cast, "cast"),
                );
            }

            const similar_results_url = `${url}/search/fuzzy?semantic=${res.result.plot}`;
            // console.log(final_url)
            const res2 = await fetch(similar_results_url, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ a: 1, b: "Textual content" }),
            });
            const similarMovies = await res2.json();
            setSimilarMoviesData(similarMovies.results);
            //   console.log(similarMovies.results);
        };
        getMovieDetails();
    }, []);

    // Socket
    useEffect(() => {
        if (ws) {
            ws.onopen = () => {
                console.log("WebSocket connected");
            };

            ws.onclose = () => {
                console.log("WebSocket disconnected");
            };

            ws.onmessage = (event: any) => {
                const data = JSON.parse(event.data);
                switch (data.type) {
                    case "room_created":
                        console.log({ room_created: data });
                        alert(`Room created. Code: ${data.roomCode}`);
                        toggleChat(true);
                        setHost(true);
                        setRoom(data.roomCode);
                        appendMessage({
                            type: "notification",
                            text: `Room has been created`,
                        });
                        break;

                    case "joined_room":
                        console.log({ joined_room: data });
                        toggleChat(true);
                        setHost(data.creator.username == username);
                        setRoom(data.roomCode);
                        appendMessage({
                            type: "notification",
                            text: `${data.username} joined the room`,
                        });
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
        }
        return () => {
            if (ws) {
                ws.close();
                setWS(null);
            }
        };
    }, []);

    return (
        <Stack
            justify="space-between"
            pb="xs"
            bg={themeOptions.color.background}
            gap={0}
            // style={{backgroundImage:'url(BgImage)'}}
        >
            {/* Background Image */}
            <div className={classes.bgContainer}>
                <NextImage
                    src={BgImage}
                    layout="fill"
                    objectFit="cover"
                    alt="Background Image"
                    className={classes.bgImage}
                />
            </div>
            {/* Navbar */}
            <div>
                <Navbar />
            </div>
            {/* Streaming Section */}
            {/* <Group className={classes.streaming}>
            </Group> */}
            {openModal && (
                <PartyWatchModal
                    handleCreate={createRoom}
                    handleJoin={joinRoom}
                />
            )}
            <div style={{ display: "flex", width: "100%" }}>
                <VideoPlayer
                    ref={playerRef}
                    ws={ws || null}
                    videoSrc={videoSrc}
                    Mp4={Mp4}
                    // tier={Usertier}
                />
                {activeChat && <PartyChat ws={ws || null} />}
            </div>
            {/* Movie Details */}
            <div
                style={{
                    backgroundColor: themeOptions.color.background,
                    zIndex: 1,
                }}
            >
                <MovieContent movieData={movieData} />

                {/* <Space h={"3rem"} /> */}

                {/* Carousal */}
                {/* <p className={classes.similarmovies} style={{zIndex:'22',color:themeOptions.color.divider}}>Similar Movies</p> */}
                <Section
                    title="Similar Movies"
                    image={Movies}
                    movieData={similarMoviesData}
                />
                {/* <SimilarMovies similarMoviesData={similarMoviesData}/> */}
            </div>
            {/* Footer */}
            <Stack bg={themeOptions.color.black} style={{ zIndex: "20" }}>
                <Footer />
            </Stack>
            <ToastContainer />
        </Stack>
    );
}
