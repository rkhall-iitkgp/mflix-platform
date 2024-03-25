import React, { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { createStyles, keyframes } from '@mantine/styles';
import PlayIcon from '@/assets/icons/play.svg'
import SkipBackwardIcon from '@/assets/icons/skipBackward.svg'
import SkipForwardIcon from '@/assets/icons/skipForward.svg'
import PartyWatchIcon from '@/assets/icons/partyWatch.svg'
import VolumeIcon from '@/assets/icons/volume.svg'
import CaptionsIcon from '@/assets/icons/captions.svg'
import FullScreenIcon from '@/assets/icons/fullScreen.svg'
import PauseIcon from '@/assets/icons/pause.svg'
import MuteVolume from '@/assets/icons/muteVolume.svg'
import Image from 'next/image';

interface VideoPlayerProps {
    defaultQuality?: string; // Optional prop for default quality
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ defaultQuality = 'auto' }) => {
    const [src] = useState<string>('http://localhost:5000/videos/output.m3u8');
    const playerRef = useRef<any>(null);
    const [quality, setQuality] = useState<string>(defaultQuality);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hls, setHls] = useState<Hls>();
    const [mute, setMute] = useState(0);
    const [progress, setProgress] = useState(0);
    let update = true;
    let listener = false;
    const loader = useRef<HTMLDivElement>(null);

    const [levels, setLevels] = useState<any>([]); // State to store the available quality levels
    const togglePlay = () => {
        const videoPlayer = playerRef.current;
        if (videoPlayer) {
            if (videoPlayer.paused) {
                videoPlayer.play();
                setIsPlaying(true);
            } else {
                videoPlayer.pause();
                setIsPlaying(false);
            }
        }
    };

    function toggleMute() {
        playerRef.current.muted = !playerRef.current.muted;
        setMute(playerRef.current.muted ? 1 : 0)
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            const videoPlayer = document.getElementById('video-player')!;
            videoPlayer.requestFullscreen().catch((err: any) => {
                alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    function updateProgress() {
        if (!update) return;
        const progress = document.getElementById('progress')!;
        const currentTime = document.getElementById('current-time')!;
        currentTime.innerText = `${String(Number.parseInt(playerRef.current.currentTime / 60)).padStart(2, '0')}:${String(Number.parseInt(playerRef.current.currentTime % 60)).padStart(2, '0')}`;
        const duration = document.getElementById("duration")!;
        duration.innerText = `${String(Number.parseInt(playerRef.current.duration / 60)).padStart(2, '0')}:${String(Number.parseInt(playerRef.current.duration % 60)).padStart(2, '0')}`;
        const percentage = (playerRef.current.currentTime / playerRef.current.duration) * 100;
        progress.style.width = `${percentage}%`;
    }

    function seek(event: any) {
        const progressBar = document.getElementById('progress-bar')!;
        const bounds = progressBar.getBoundingClientRect();
        const percent = (event.clientX - bounds.left) / bounds.width;
        const currentTime = document.getElementById('current-time')!;
        currentTime.innerText = `${String(Number.parseInt(playerRef.current.currentTime / 60)).padStart(2, '0')}:${String(Number.parseInt(playerRef.current.currentTime % 60)).padStart(2, '0')}`;
        playerRef.current.currentTime = percent * playerRef.current.duration;
    }

    function seekForward() {
        playerRef.current.currentTime += 15;
    }
    function seekBackward() {
        playerRef.current.currentTime -= 15;
    }
    // Function to handle quality changes
    const changeQuality = (newQuality: string): void => {
        setQuality(newQuality);

        if (hls) {
            if (newQuality === '-1') {
                hls.currentLevel = -1;
            } else {
                hls.currentLevel = parseInt(newQuality);
            }
        }
    };

    // Effect to attach hls.js event listeners to the player
    useEffect(() => {
        let timer = 3;
        const video = document.getElementById('video') as HTMLMediaElement;
        const videoSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

        if (Hls.isSupported()) {
            const hls = new Hls();
            setHls(hls);
            hls.loadSource(videoSrc);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play();
            });
            hls.on(Hls.Events.LEVEL_SWITCHED, function (event, data) {
                const level = hls.levels[data.level];
                console.log(`Switched to level: ${level.height}p`);
            });

            playerRef.current.addEventListener('timeupdate', updateProgress);
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoSrc;
            video.addEventListener('loadedmetadata', () => {
                video.play();
            });
            const duration = document.getElementById('duration')!;
            video.addEventListener('timeupdate', () => {
                duration.innerText = `${String(Number.parseInt(playerRef.current.duration / 60)).padStart(2, '0')}:${String(Number.parseInt(playerRef.current.duration % 60)).padStart(2, '0')}`;
            });
        }

        const dot = document.getElementById('dot')!;
        dot.addEventListener('mousedown', dragDot)
        document.addEventListener('mouseup', (e) => {
            if (!listener) return false;
            document.removeEventListener('mousemove', moveDot);
            listener = false
            const progressBar = document.getElementById('progress-bar')!;
            const { width } = progressBar.getBoundingClientRect();
            const x = e.clientX - progressBar.getBoundingClientRect().left;
            let percentage = (x / width) * 100;
            if (percentage < 0) percentage = 0;
            if (percentage > 100) percentage = 100;
            playerRef.current.currentTime = (percentage / 100) * playerRef.current.duration;
            update = true
        })

        function dragDot() {
            listener = true;
            console.log('dragging')
            document.addEventListener('mousemove', moveDot)
            update = false;
        }

        function moveDot(e) {
            const progressBar = document.getElementById('progress-bar')!;
            const { width } = progressBar.getBoundingClientRect();
            const x = e.clientX - progressBar.getBoundingClientRect().left;
            let percentage = (x / width) * 100;
            if (percentage < 0) percentage = 0;
            if (percentage > 100) percentage = 100;
            const progress = document.getElementById('progress')!;
            progress.style.width = `${percentage}%`;
        }

        setInterval(() => {
            timer -= 0.01;
            if (timer <= 0) timer = 0;
            if (timer === 0) {
                document.getElementById("video-player")!.style.cursor = "none";
                document.getElementById("controls-container")!.style.opacity = "0";
            }
        }, 10)

        document.getElementById('video')?.addEventListener("waiting", () => {
            loader.current.style.display = "flex";
        })

        document.getElementById('video')?.addEventListener("playing", () => {
            loader.current.style.display = "none";
        })

        document.getElementById('video')?.addEventListener("pause", () => {
            loader.current.style.display = "none";
        })

        document.getElementById("video-player")?.addEventListener('mousemove', () => {
            timer = 3;
            document.getElementById("video-player")!.style.cursor = "default";
            document.getElementById("controls-container")!.style.opacity = "1";
        })
        
        document.getElementById("video-player")?.addEventListener('click', () => {
            timer = 3;
            document.getElementById("video-player")!.style.cursor = "default";
            document.getElementById("controls-container")!.style.opacity = "1";
        })
        
        document.getElementById("video")?.addEventListener('click', () => {
            togglePlay();
        })

        document.addEventListener("keypress", (e) => {
            console.log(e);
            if (e.code == "KeyK" || e.code == "Space") togglePlay();
            else if (e.code == "KeyM") toggleMute();
            else if (e.code == "KeyF") toggleFullscreen();
            else if (e.code == "ArrowLeft" || e.code == "KeyJ") seekBackward();
            else if (e.code == "ArrowRight" || e.code == "KeyL") seekForward();
        })
    }, []);
    useEffect(() => {
        if (hls) {
            console.log('hls.levels', hls.levels);
            setLevels(hls.levels);
        }
    }, [quality, hls]);

    const { classes, cx } = useStyles()
    return (
        <div className={classes.videoContainer} id="video-player" style={{zIndex:'100'}}>
            <div className={classes.loaderContainer} ref={loader}>
                <div className={classes.loader}></div>
            </div>
            <video id="video" controls={false} ref={playerRef} className={classes.video}></video>
            <div className={classes.controlsContainer} id="controls-container">
                <div className={classes.progressContainer}>
                    <p className={classes.durations} id="current-time">00:00</p>
                    <div
                        id="progress-bar"
                        className={classes.progressBar}
                        onClick={(e: any) => {
                            seek(e);
                        }}
                    >
                        <div id="progress" className={classes.progress}></div>
                        <div id='dot' className={classes.dot}></div>
                    </div>
                    <p className={classes.durations} id="duration">00:00</p>
                </div>
                <div className={classes.controls}>
                    <div className={classes.flex}>
                        <Image src={PartyWatchIcon} alt="PartyWatchIcon" width={25} height={25} className={classes.partyWatchIcon} />
                        <p className={classes.partyWatch}>Party Watch</p>
                    </div>
                    <div className={classes.flex}>
                        <Image src={SkipBackwardIcon} alt="SkipBackwardIcon" width={25} height={25} className={classes.icon} onClick={seekBackward} />
                        {isPlaying ?
                            <Image src={PauseIcon} alt='PauseIcon' width={25} height={25} className={classes.icon} style={{ scale: 1.2 }} onClick={e => {
                                e.stopPropagation();
                                togglePlay();
                            }} />
                            :
                            <Image src={PlayIcon} alt="PlayIcon" width={25} height={25} className={classes.icon} style={{ scale: 1.2 }} onClick={e => {
                                e.stopPropagation();
                                togglePlay();
                            }} />
                        }
                        <Image src={SkipForwardIcon} alt="SkipFowardIcon" width={25} height={25} className={classes.icon} onClick={seekForward} />
                    </div>
                    <div className={cx(classes.flex, classes.gap)}>
                        <div className={classes.quality}>
                            Quality
                            <span>
                                <select name="quality" id="quality" onChange={(e) => changeQuality(e.target.value)} value={quality}>
                                    <option value="-1">Auto</option>
                                    {levels.map((level: any, id: any) => (
                                        <option value={id}>{level.name}</option>
                                    ))}
                                </select>
                            </span>
                        </div>
                        {mute ?
                            <Image src={MuteVolume} alt='Muted Volume' width={25} height={25} className={cx(classes.icon, classes.rightIcons)} onClick={toggleMute} />
                            :
                            <Image src={VolumeIcon} alt="PlayIcon" width={25} height={25} className={cx(classes.icon, classes.rightIcons)} onClick={toggleMute} />}
                        <Image src={CaptionsIcon} alt="PlayIcon" width={25} height={25} className={cx(classes.icon, classes.rightIcons)} />
                        <Image src={FullScreenIcon} alt="PlayIcon" width={25} height={25} className={cx(classes.icon, classes.rightIcons)} onClick={toggleFullscreen} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;

const useStyles = createStyles(() => ({
    controlsContainer: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "0rem 1rem"
    },
    videoContainer: {
        position: "relative",
        width: "100%",
        maxWidth: "100%",
        maxHeight: "100vh",
        minHeight: "100vh",
        overflowX: "hidden",
        display: "flex",
        justifyContent: "center",
        // background:themeOptions.color.black,
    },
    video: {
        // width: "100%",
        height: "100vh",
    },
    controls: {
        // position: "absolute",
        // bottom: 0,
        // backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "0rem 1rem"
    },
    icon: {
        margin: "1rem 0.2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "2.5rem",
        height: "2.5rem",
        zIndex: 10
    },
    rightIcons: {
        width: "1.7rem",
        height: "1.7rem",
        "&:hover": {
            transform: "scale(1.2)"
        }
    },
    flex: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem"
    },
    partyWatchIcon: {
        height: "2.5rem"
    },
    partyWatch: {
        fontWeight: "bold",
        color: "white",
        verticalAlign: "middle",
        marginLeft: "0.1rem"
    },
    gap: {
        gap: "1rem"
    },
    progressContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
    },
    durations: {
        color: "white",
        fontWeight: "bold",
    },
    progressBar: {
        width: '100%',
        height: '5px',
        background: 'rgb(255, 255, 255, 0.7)',
        cursor: 'pointer',
        // position: "relative",
        display: "flex",
    },
    progress: {
        height: '100%',
        background: '#fff',
        width: '0%',
    },
    dot: {
        transform: 'translate(-5px, -2.7px)',
        height: '10px',
        width: '10px',
        background: 'white',
        borderRadius: '50%',
        transition: "transform 0.1s",
        "&:hover": {
            transform: 'translate(-5px, -2.7px) scale(1.5)'
        }
    },
    quality: {
        color: "white",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
        select: {
            fontWeight: "normal",
            backgroundColor: "transparent",
            outline: "none",
            border: "2px solid white",
            padding: "2px",
            color: "white",
            borderRadius: "8px",
            option: {
                background: "rgba(0, 0, 0, 0.5)"
            }
        }
    },
    loaderContainer: {
        width: "100%",
        height: "100%",
        display: "none",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        zIndex: 100,
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    loader: {
        width: "50px",
        height: "50px",
        border: "5px solid #f3f3f3",
        borderTop: "5px solid #7011b6",
        borderRadius: "50%",
        animation: `${spin} 0.5s linear infinite`,
    }
}))

const spin = keyframes({
    '0%': {
        transform: 'rotate(0deg)'
    },
    '100%': {
        transform: 'rotate(360deg)'
    }
})