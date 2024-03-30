"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import style from "./VPlayer.module.css";
import Image from "next/image";
import LeftArrowIcon from "@/assets/icons/leftArrow.svg";
import PauseIcon from "@/assets/icons/pause.svg";
import PlayIcon from "@/assets/icons/play.svg";
import SkipBackwardIcon from "@/assets/icons/skipBackward.svg";
import SkipForwardIcon from "@/assets/icons/skipForward.svg";
import PartyWatchIcon from "@/assets/icons/partyWatch.svg";
import VolumeIcon from "@/assets/icons/volume.svg";
import FullScreenIcon from "@/assets/icons/fullScreen.svg";
import MuteVolumeIcon from "@/assets/icons/muteVolume.svg";
import SettingsIcon from "@/assets/icons/settings.svg";
import Hls from "hls.js";
import { useHover } from "@mantine/hooks";
import usePlayerStore from "@/Stores/PlayerStore";
import useForwardRef from "@/utils/useForwardRef";
import { createStyles } from "@mantine/styles";
import useLoginStore from "@/Stores/LoginStore";

type Props = { ws: WebSocket; videoSrc: string; Mp4: boolean; tier: string };

const VideoPlayer = forwardRef<HTMLVideoElement, Props>(
    ({ ws, videoSrc, Mp4, tier }: Props, ref) => {
        const {classes} = useStyles();
        const loaderRef = useRef<HTMLDivElement>(null);
        const playerContainerRef = useRef<HTMLDivElement>(null);
        // const playerRef = useRef<HTMLVideoElement>(null);
        const progressBarRef = useRef<HTMLDivElement>(null);
        const progressRef = useRef<HTMLDivElement>(null);
        const dotRef = useRef<HTMLDivElement>(null);
        const volumeBarRef = useRef<HTMLDivElement>(null);
        const controlsRef = useRef<HTMLDivElement>(null);
        const volumeRef = useRef<HTMLDivElement>(null);
        const volumeDotRef = useRef<HTMLDivElement>(null);
        const currTimeRef = useRef<HTMLDivElement>(null);
        const totalTimeRef = useRef<HTMLDivElement>(null);
        const playerRef = useForwardRef(ref);
        const [loading, setLoading] = useState<boolean>(false);
        const [fullscreen, setFullscreen] = useState<boolean>(false);
        const [isMute, setIsMute] = useState<boolean>(false);
        const [isSeeking, setSeeking] = useState<boolean>(false);
        const [isVolumeSeeking, setVolumeSeeking] = useState<boolean>(false);
        const [showPopup, setShowPopup] = useState<boolean>(false);
        const [hls, setHls] = useState<Hls>();
        const [levels, setLevels] = useState<any>([]);
        const [quality, setQuality] = useState<string>("auto");
        const [playbackRate, setPlaybackRate] = useState(1);
        const Usertier = useLoginStore(
            (state) => state.subscriptionTier.tier.tier,
        );

        const { hovered, ref: volContainerRef } = useHover();
        // Zustand states
        const {
            isChatFocused,
            allowedControls,
            toggleChat,
            isPlaying,
            setIsPlaying,
            username,
            currentTime: storeCurrentTime,
            setCurrentTime: storeSetCurrentTime,
            appendMessage,
            isHost,
            room,
        } = usePlayerStore();

        const seekPlayerToLocation = (e: any) => {
            if (progressBarRef.current && progressRef.current) {
                const { width } =
                    progressBarRef.current.getBoundingClientRect();
                const x =
                    e.clientX -
                    progressBarRef.current.getBoundingClientRect().left;
                let percentage = (x / width) * 100;
                if (percentage < 0) percentage = 0;
                if (percentage > 100) percentage = 100;
                progressRef.current.style.width = `${percentage}%`;
                playerRef.current!.currentTime =
                    (percentage / 100) * playerRef.current!.duration;
                ws.send(
                    JSON.stringify({
                        type: "seek",
                        seekTime: playerRef.current!.currentTime,
                    }),
                );
            }
        };

        const setCurrVolume = (e: any) => {
            if (volumeBarRef.current && volumeRef.current) {
                const { width } = volumeBarRef.current.getBoundingClientRect();
                const x =
                    e.clientX -
                    volumeBarRef.current.getBoundingClientRect().left;
                let percentage = (x / width) * 100;
                if (percentage < 0) percentage = 0;
                if (percentage > 100) percentage = 100;
                volumeRef.current.style.width = `${percentage}%`;
            }
        };

        const togglePlayState = (state: boolean) => {
            if (playerRef.current) {
                console.log({ isHost, allowedControls, room });
                if (!isHost && !allowedControls) return;
                if (isHost || allowedControls || !room) {
                    setIsPlaying(state);
                    ws.send(
                        JSON.stringify({
                            type: "play_pause",
                            isPlaying: state,
                        }),
                    );
                }
            }
        };

        const toggleMute = () => {
            if (!playerRef.current) return;
            playerRef.current.muted = !playerRef.current.muted;
            setIsMute(playerRef.current.muted);
        };

        const toggleFullscreen = () => {
            if (!document.fullscreenElement) {
                playerContainerRef
                    .current!.requestFullscreen()
                    .catch((err: any) => {
                        alert(
                            `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`,
                        );
                    });
                setFullscreen(true);
            } else {
                document.exitFullscreen();
                setFullscreen(false);
            }
        };

        const seekForward = () => {
            if (!playerRef.current) return;
            playerRef.current.currentTime += 15;
            storeSetCurrentTime(playerRef.current!.currentTime);
            ws!.send(
                JSON.stringify({
                    type: "seek",
                    username,
                    seekTime: playerRef.current.currentTime,
                }),
            );
        };

        const seekBackward = () => {
            if (!playerRef.current) return;
            playerRef.current.currentTime -= 15;
            storeSetCurrentTime(playerRef.current!.currentTime);
            ws!.send(
                JSON.stringify({
                    type: "seek",
                    username,
                    seekTime: playerRef.current.currentTime,
                }),
            );
        };

        const updateProgress = () => {
            if (
                !playerRef.current ||
                !progressRef.current ||
                !currTimeRef.current ||
                !totalTimeRef.current
            )
                return;
            storeSetCurrentTime(playerRef.current?.currentTime);
            currTimeRef.current.innerText = `${String(Number.parseInt(`${playerRef.current.currentTime / 60}`)).padStart(2, "0")}:${String(Number.parseInt(`${playerRef.current.currentTime % 60}`)).padStart(2, "0")}`;
            totalTimeRef.current.innerText = !isNaN(playerRef.current.duration)
                ? `${String(Number.parseInt(`${playerRef.current.duration / 60}`)).padStart(2, "0")}:${String(Number.parseInt(`${playerRef.current.duration % 60}`)).padStart(2, "0")}`
                : "";
            const percentage =
                (playerRef.current.currentTime / playerRef.current.duration) *
                100;
            progressRef.current.style.width = `${percentage}%`;
        };

        const changeQuality = (newQuality: string): void => {
            setQuality(newQuality);

            if (hls) {
                if (newQuality === "-1") {
                    hls.currentLevel = -1;
                } else {
                    hls.currentLevel = parseInt(newQuality);
                }
            }
        };

        const changePlaybackRate = (value: number) => {
            if (playerRef.current) {
                playerRef.current.playbackRate = value;
                setPlaybackRate(value);
            }
        };

        // initialize player
        useEffect(() => {
            console.log("Mp4", Mp4);
            if (playerRef && playerRef.current && videoSrc) {
                if (Hls.isSupported() && !Mp4) {
                    const hls = new Hls();
                    setHls(hls);
                    console.log("videoSrc", videoSrc);
                    hls.loadSource(videoSrc);
                    hls.attachMedia(playerRef.current as HTMLMediaElement);
                    hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        // video.play();
                    });
                    hls.on(Hls.Events.LEVEL_SWITCHED, function (event, data) {
                        const level = hls.levels[data.level];
                        console.log(`Switched to level: ${level.height}p`);
                    });
                    hls.on(Hls.Events.LEVELS_UPDATED, function (event, data) {
                        console.log("data,Usertier", data, Usertier);
                        if (Usertier === "free" || Usertier === "") {
                            setLevels(
                                data.levels.filter(
                                    (level) => level.height <= 480,
                                ),
                            );
                        } else if (Usertier === "basic") {
                            setLevels(
                                data.levels.filter(
                                    (level) => level.height <= 720,
                                ),
                            );
                        } else if (Usertier === "standard") {
                            setLevels(
                                data.levels.filter(
                                    (level) => level.height <= 1080,
                                ),
                            );
                        } else {
                            setLevels(data.levels);
                        }
                    });
                } else if (
                    playerRef.current.canPlayType(
                        "application/vnd.apple.mpegurl",
                    ) &&
                    !Mp4
                ) {
                    playerRef.current.src = videoSrc;
                    playerRef.current.addEventListener("loadedmetadata", () => {
                        playerRef.current!.play();
                    });
                } else {
                    console.log("videoSrc", videoSrc);
                    playerRef.current.src = videoSrc;
                    playerRef.current.addEventListener("loadedmetadata", () => {
                        playerRef.current!.play();
                    });
                }
            }
        }, [videoSrc, playerRef, Mp4]);

        // quality control
        useEffect(() => {
            if (hls) {
                console.log("Usertier", Usertier);
                if (Usertier === "free" || Usertier === "") {
                    setLevels(
                        hls.levels.filter((level) => level.height <= 480),
                    );
                } else if (Usertier === "basic") {
                    setLevels(
                        hls.levels.filter((level) => level.height <= 720),
                    );
                } else if (Usertier === "standard") {
                    setLevels(
                        hls.levels.filter((level) => level.height <= 1080),
                    );
                } else {
                    setLevels(hls.levels);
                }
            }
        }, [quality, hls, hls?.levels, Usertier]);

        // player seek on slide
        useEffect(() => {
            const mouseDown = () => {
                setSeeking(true);
            };

            const mouseUp = () => {
                if (ws)
                    ws.send(
                        JSON.stringify({
                            type: "seek",
                            seekTime: playerRef.current.currentTime,
                        }),
                    );
                setSeeking(false);
            };

            const mouseMove = (e: any) => {
                if (
                    isSeeking &&
                    progressBarRef.current &&
                    progressRef.current
                ) {
                    const { width } =
                        progressBarRef.current.getBoundingClientRect();
                    const x =
                        e.clientX -
                        progressBarRef.current.getBoundingClientRect().left;
                    let percentage = (x / width) * 100;
                    if (percentage < 0) percentage = 0;
                    if (percentage > 100) percentage = 100;
                    progressRef.current.style.width = `${percentage}%`;
                    playerRef.current!.currentTime =
                        (percentage / 100) * playerRef.current!.duration;
                }
            };

            dotRef.current!.addEventListener("mousedown", mouseDown);
            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp);

            return () => {
                if (dotRef.current)
                    dotRef.current!.removeEventListener("mousemove", mouseMove);
                document.removeEventListener("mousemove", mouseMove);
                document.removeEventListener("mouseup", mouseUp);
            };
        }, [isSeeking]);

        // Volume seek
        useEffect(() => {
            const mouseDown = () => {
                setVolumeSeeking(true);
            };

            const mouseUp = () => {
                setVolumeSeeking(false);
            };

            const mouseMove = (e: any) => {
                if (
                    isVolumeSeeking &&
                    volumeBarRef.current &&
                    volumeRef.current
                ) {
                    const { width } =
                        volumeBarRef.current.getBoundingClientRect();
                    const x =
                        e.clientX -
                        volumeBarRef.current.getBoundingClientRect().left;
                    let percentage = (x / width) * 100;
                    if (percentage < 0) percentage = 0;
                    if (percentage > 100) percentage = 100;
                    volumeRef.current.style.width = `${percentage}%`;
                }
            };

            volumeDotRef.current!.addEventListener("mousedown", mouseDown);
            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp);

            return () => {
                volumeDotRef.current?.removeEventListener(
                    "mousemove",
                    mouseMove,
                );
                document.removeEventListener("mousemove", mouseMove);
                document.removeEventListener("mouseup", mouseUp);
            };
        }, [isVolumeSeeking]);

        // keyboard shortcuts
        useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (!isChatFocused) {
                    if (e.code === "KeyK" || e.code === "Space") {
                        const isPaused = playerRef.current!.paused;
                        if (isPaused) {
                            togglePlayState(true);
                        } else {
                            togglePlayState(false);
                        }
                    } else if (e.code === "KeyM") toggleMute();
                    else if (e.code === "KeyF") toggleFullscreen();
                    else if (e.code === "ArrowLeft" || e.code === "KeyJ")
                        seekBackward();
                    else if (e.code === "ArrowRight" || e.code === "KeyL")
                        seekForward();
                }
            };

            document.addEventListener("keydown", handleKeyDown);
            return () => {
                document.removeEventListener("keydown", handleKeyDown);
            };
        }, [isChatFocused]);

        // play/pause on click
        useEffect(() => {
            const handleClick = (event: MouseEvent) => {
                if (
                    playerContainerRef.current &&
                    controlsRef.current &&
                    !controlsRef.current.contains(event.target as Node)
                ) {
                    const isPaused = playerRef.current!.paused;
                    if (isPaused) {
                        togglePlayState(true);
                    } else {
                        togglePlayState(false);
                    }
                }
            };

            playerContainerRef.current?.addEventListener("click", handleClick);

            return () => {
                playerContainerRef.current?.removeEventListener(
                    "click",
                    handleClick,
                );
            };
        }, []);

        // play/pause on store state
        useEffect(() => {
            if (playerRef && playerRef.current) {
                if (isPlaying) {
                    playerRef.current.play();
                } else {
                    playerRef.current.pause();
                }
            }
        }, [isPlaying]);

        return (
            <div ref={playerContainerRef} className={style.videoContainer}>
                <div style={{ position: "relative" }}>
                    <div
                        ref={loaderRef}
                        style={{ display: loading ? "flex" : "none" }}
                        className={style.loaderContainer}
                    >
                        <div className={style.loader}></div>
                    </div>
                    <div
                        // TODO : Add full screen listener
                        style={{ display: fullscreen ? "flex" : "none" }}
                        className={style.videoHeaders}
                    >
                        <Image
                            src={LeftArrowIcon}
                            alt="Esc"
                            width={25}
                            height={25}
                            className={style.icon}
                            onClick={toggleFullscreen}
                        />
                        <h2>Movie Title</h2>
                        <div></div>
                    </div>
                    <video
                        ref={playerRef}
                        autoPlay={false}
                        onTimeUpdate={updateProgress}
                        onWaiting={() => setLoading(true)}
                        onPlaying={() => setLoading(false)}
                        onPause={() => setLoading(false)}
                        className={style.video}
                        controls={false}
                    />
                    <div ref={controlsRef} className={style.controlsContainer}>
                        <div className={style.progressContainer}>
                            <p ref={currTimeRef} className={style.durations}>
                                00:00
                            </p>
                            <div
                                id="progress-bar"
                                className={style.progressBar}
                                ref={progressBarRef}
                                onClick={seekPlayerToLocation}
                            >
                                <div
                                    id="progress"
                                    ref={progressRef}
                                    className={style.progress}
                                ></div>
                                <div
                                    id="dot"
                                    ref={dotRef}
                                    className={style.dot}
                                ></div>
                            </div>
                            <p ref={totalTimeRef} className={style.durations}>
                                00:00
                            </p>
                        </div>
                        <div className={style.controls}>
                            <div className={style.left_controls}>
                                {isPlaying ? (
                                    <Image
                                        src={PauseIcon}
                                        alt="PauseIcon"
                                        width={25}
                                        height={25}
                                        className={style.icon}
                                        style={{ scale: 1.2 }}
                                        onClick={() => togglePlayState(false)}
                                    />
                                ) : (
                                    <Image
                                        src={PlayIcon}
                                        alt="PlayIcon"
                                        width={25}
                                        height={25}
                                        className={style.icon}
                                        style={{ scale: 1.2 }}
                                        onClick={() => togglePlayState(true)}
                                    />
                                )}

                                <Image
                                    src={SkipBackwardIcon}
                                    alt="SkipBackwardIcon"
                                    width={25}
                                    height={25}
                                    className={style.icon}
                                    onClick={seekBackward}
                                />
                                <Image
                                    src={SkipForwardIcon}
                                    alt="SkipFowardIcon"
                                    width={25}
                                    height={25}
                                    className={style.icon}
                                    onClick={seekForward}
                                />
                                <div
                                    ref={volContainerRef}
                                    style={{
                                        position: "relative",
                                        display: "flex",
                                        gap: "1rem",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {isMute ? (
                                        <Image
                                            src={MuteVolumeIcon}
                                            alt="Muted Volume"
                                            width={25}
                                            height={25}
                                            className={style.icon}
                                            onClick={toggleMute}
                                        />
                                    ) : (
                                        <Image
                                            src={VolumeIcon}
                                            alt="PlayIcon"
                                            width={25}
                                            height={25}
                                            className={style.icon}
                                            onClick={toggleMute}
                                        />
                                    )}

                                    <div
                                        style={{
                                            display: hovered ? "block" : "none",
                                            borderRadius: "1rem",
                                            bottom: "210%",
                                            backgroundColor:
                                                "rgba(0, 0, 0, 0.7)",
                                            // padding: '1rem',
                                            transition: "display 0.5s 2s",
                                            zIndex: 100,
                                        }}
                                    >
                                        <div
                                            ref={volumeBarRef}
                                            onClick={setCurrVolume}
                                            className={style.volBar}
                                        >
                                            <div
                                                ref={volumeRef}
                                                className={style.volume}
                                            ></div>
                                            <div
                                                ref={volumeDotRef}
                                                className={style.volumeDot}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    gap: "2rem",
                                    alignItems: "center",
                                }}
                            >
                                <button
                                    onClick={() => toggleChat(undefined)}
                                    className={style.partyWatch}
                                >
                                    <Image
                                        src={PartyWatchIcon}
                                        alt="PartyWatchIcon"
                                        width={25}
                                        height={25}
                                        className={style.partyWatchIcon}
                                    />
                                    Party Watch
                                </button>
                                <div
                                    style={{
                                        position: "relative",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Image
                                        src={SettingsIcon}
                                        alt="Settings"
                                        width={25}
                                        height={25}
                                        className={style.rightIcons}
                                        onClick={() => setShowPopup(!showPopup)}
                                    />
                                    {showPopup && (
                                        <div className={style.popup}>
                                            <div
                                                className={style.settingsOption}
                                            >
                                                <p>Quality</p>
                                                <span>
                                                    <select
                                                        name="quality"
                                                        id="quality"
                                                        onChange={(e) =>
                                                            changeQuality(
                                                                e.target.value,
                                                            )
                                                        }
                                                        value={quality}
                                                    >
                                                        <option value="-1">
                                                            Auto
                                                        </option>
                                                        {levels.map(
                                                            (
                                                                level: any,
                                                                id: any,
                                                            ) => (
                                                                <option
                                                                    key={id}
                                                                    value={id}
                                                                >
                                                                    {level.name}
                                                                </option>
                                                            ),
                                                        )}
                                                    </select>
                                                </span>
                                            </div>
                                            <div
                                                className={style.settingsOption}
                                            >
                                                <p>Speed</p>
                                                <span>
                                                    <select
                                                        name="speed"
                                                        id="speed"
                                                        onChange={(e) =>
                                                            changePlaybackRate(
                                                                Number.parseFloat(
                                                                    e.target
                                                                        .value,
                                                                ),
                                                            )
                                                        }
                                                        value={playbackRate}
                                                    >
                                                        <option value={0.25}>
                                                            0.25
                                                        </option>
                                                        <option value={0.5}>
                                                            0.5
                                                        </option>
                                                        <option value={0.75}>
                                                            0.75
                                                        </option>
                                                        <option value={1}>
                                                            1
                                                        </option>
                                                        <option value={1.25}>
                                                            1.25
                                                        </option>
                                                        <option value={1.5}>
                                                            1.5
                                                        </option>
                                                        <option value={1.75}>
                                                            1.75
                                                        </option>
                                                        <option value={2}>
                                                            2
                                                        </option>
                                                    </select>
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <Image
                                    style={{ cursor: "pointer" }}
                                    src={FullScreenIcon}
                                    alt="PlayIcon"
                                    width={25}
                                    height={25}
                                    className={style.rightIcons}
                                    onClick={toggleFullscreen}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.modal}>
                    <div className={classes.modalContent}>
                        <button className={classes.button}>
                            Create Room
                        </button>
                        <button className={classes.button}>
                            Join Room
                        </button>
                    </div>
                </div>
            </div>
        );
    },
);
export default VideoPlayer;

const useStyles = createStyles((theme) => ({
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background
      zIndex: 10, // Ensure modal is on top
    },
    modalContent: {
      backgroundColor: '#212121', // Dark modal content
    //   padding: theme.spacing(4),
      borderRadius: 4,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between', // Buttons on opposite sides
    },
    button: {
    //   padding: theme.spacing(2),
      backgroundColor: '#424242', // Button color
      color: '#fff', // Button text color
      border: 'none',
      borderRadius: 4,
      cursor: 'pointer',
    },
  }));
  