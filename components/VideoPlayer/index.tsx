import React, { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { createStyles, keyframes } from '@mantine/styles';
import { relative } from 'path';
import PlayIcon from '@/assets/icons/play.svg';
import SkipBackwardIcon from '@/assets/icons/skipBackward.svg';
import SkipForwardIcon from '@/assets/icons/skipForward.svg';
import PartyWatchIcon from '@/assets/icons/partyWatch.svg';
import VolumeIcon from '@/assets/icons/volume.svg';
import FullScreenIcon from '@/assets/icons/fullScreen.svg';
import PauseIcon from '@/assets/icons/pause.svg';
import MuteVolumeIcon from '@/assets/icons/muteVolume.svg';
import SettingsIcon from '@/assets/icons/settings.svg';
import LeftArrowIcon from '@/assets/icons/leftArrow.svg';
import Image from 'next/image';
import { useHover } from '@mantine/hooks';
import usePlayerStore from '@/Stores/PlayerStore';

interface VideoPlayerProps {
  defaultQuality?: string; // Optional prop for default quality
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ defaultQuality = 'auto' }) => {
  const { toggleChat, isPlaying, setIsPlaying, appendMessage, username } = usePlayerStore();
  const [src] = useState<string>('http://localhost:5000/videos/output.m3u8');
  const playerRef = useRef<HTMLVideoElement>(null);
  const [quality, setQuality] = useState<string>(defaultQuality);
  // const [isPlaying, setIsPlaying] = useState(false);

  const [hls, setHls] = useState<Hls>();
  const [mute, setMute] = useState(0);
  const { hovered, ref } = useHover();
  let update = true;
  let listener = false;
  let listenerVol = false;
  const loader = useRef<HTMLDivElement>(null);
  const [playbackRate, setPlaybackRate] = React.useState(1);
  const [showPopup, setShowPopup] = React.useState(false);

  const [levels, setLevels] = useState<any>([]); // State to store the available quality levels

  const togglePlay = () => {
    const videoPlayer = playerRef.current;
    if (videoPlayer) {
      if (videoPlayer.paused) {
        // ws.send(JSON.stringify({ type: 'play_pause', isPlaying: videoPlayer.paused }));
        setIsPlaying(true);
        videoPlayer.play();
      } else {
        // ws.send(JSON.stringify({ type: 'play_pause', isPlaying: videoPlayer.paused }));
        videoPlayer.pause();
        setIsPlaying(false);
      }
    }
  };

  function toggleMute() {
    if (!playerRef.current) return;
    playerRef.current.muted = !playerRef.current.muted;
    setMute(playerRef.current.muted ? 1 : 0);
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      const videoPlayer = document.getElementById('video-player')!;
      videoPlayer.requestFullscreen().catch((err: any) => {
        alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
      });
      document.getElementById('video-header')!.style.display = 'flex';
    } else {
      document.exitFullscreen();
      document.getElementById('video-header')!.style.display = 'none';
    }
  }

  function updateProgress() {
    if (!playerRef.current) return;
    if (!update) return;
    const progress = document.getElementById('progress')!;
    const currentTime = document.getElementById('current-time')!;
    currentTime.innerText = `${String(Number.parseInt(`${playerRef.current.currentTime / 60}`)).padStart(2, '0')}:${String(Number.parseInt(`${playerRef.current.currentTime % 60}`)).padStart(2, '0')}`;
    const duration = document.getElementById('duration')!;
    duration.innerText = `${String(Number.parseInt(`${playerRef.current.duration / 60}`)).padStart(2, '0')}:${String(Number.parseInt(`${playerRef.current.duration % 60}`)).padStart(2, '0')}`;
    const percentage = (playerRef.current.currentTime / playerRef.current.duration) * 100;
    progress.style.width = `${percentage}%`;
  }

  function seek(event: any) {
    if (!playerRef.current) return;
    const progressBar = document.getElementById('progress-bar')!;
    const bounds = progressBar.getBoundingClientRect();
    const percent = (event.clientX - bounds.left) / bounds.width;
    const currentTime = document.getElementById('current-time')!;
    currentTime.innerText = `${String(Number.parseInt(`${playerRef.current.currentTime / 60}`)).padStart(2, '0')}:${String(Number.parseInt(`${playerRef.current.currentTime % 60}`)).padStart(2, '0')}`;
    playerRef.current.currentTime = percent * playerRef.current.duration;
  }

  function seekForward() {
    if (!playerRef.current) return;
    playerRef.current.currentTime += 15;
  }

  function seekBackward() {
    if (!playerRef.current) return;
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

  function changePlaybackRate(value: number) {
    const video = document.getElementById('video') as HTMLVideoElement;
    video.playbackRate = value;
    setPlaybackRate(value);
  }

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
        // video.play();
      });
      hls.on(Hls.Events.LEVEL_SWITCHED, function (event, data) {
        const level = hls.levels[data.level];
        console.log(`Switched to level: ${level.height}p`);
      });

      playerRef.current!.addEventListener('timeupdate', updateProgress);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
      video.addEventListener('loadedmetadata', () => {
        // video.play();
      });
      const duration = document.getElementById('duration')!;
      video.addEventListener('timeupdate', () => {
        duration.innerText = `${String(Number.parseInt(`${playerRef.current!.duration / 60}`)).padStart(2, '0')}:${String(Number.parseInt(`${playerRef.current!.duration % 60}`)).padStart(2, '0')}`;
      });
    }

    const dot = document.getElementById('dot')!;
    dot.addEventListener('mousedown', dragDot);
    document.addEventListener('mouseup', (e) => {
      if (!listener) return;
      if (!playerRef.current) return;
      document.removeEventListener('mousemove', moveDot);
      listener = false;
      const progressBar = document.getElementById('progress-bar')!;
      const { width } = progressBar.getBoundingClientRect();

      const x = e.clientX - progressBar.getBoundingClientRect().left;
      let percentage = (x / width) * 100;
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      playerRef.current.currentTime = (percentage / 100) * playerRef.current.duration;
      update = true;
    });

    function dragDot() {
      listener = true;
      console.log('dragging');
      document.addEventListener('mousemove', moveDot);
      update = false;
    }

    function moveDot(e: any) {
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
        document.getElementById('video-player')!.style.cursor = 'none';
        document.getElementById('controls-container')!.style.opacity = '0';
        document.getElementById('video-header')!.style.opacity = '0';
      }
    }, 10);

    document.getElementById('video')?.addEventListener('waiting', () => {
      loader.current!.style.display = 'flex';
    });

    document.getElementById('video')?.addEventListener('playing', () => {
      loader.current!.style.display = 'none';
    });

    document.getElementById('video')?.addEventListener('pause', () => {
      loader.current!.style.display = 'none';
    });

    document.getElementById('video-player')?.addEventListener('mousemove', () => {
      timer = 3;
      document.getElementById('video-player')!.style.cursor = 'default';
      document.getElementById('controls-container')!.style.opacity = '1';
      document.getElementById('video-header')!.style.opacity = '1';
    });

    document.getElementById('video-player')?.addEventListener('click', () => {
      timer = 3;
      document.getElementById('video-player')!.style.cursor = 'default';
      document.getElementById('controls-container')!.style.opacity = '1';
      document.getElementById('video-header')!.style.opacity = '1';
    });

    document.getElementById('video')?.addEventListener('click', () => {
      togglePlay();
    });

    document.addEventListener('keypress', (e) => {
      if (e.code == 'KeyK' || e.code == 'Space') togglePlay();
      else if (e.code == 'KeyM') toggleMute();
      else if (e.code == 'KeyF') toggleFullscreen();
      else if (e.code == 'ArrowLeft' || e.code == 'KeyJ') seekBackward();
      else if (e.code == 'ArrowRight' || e.code == 'KeyL') seekForward();
    });

    const vol = document.getElementById('volume-dot')!;
    const volBar = document.getElementById('volume-bar')!;
    vol.addEventListener('mousedown', (e) => {
      listenerVol = true;
      document.addEventListener('mousemove', moveVol);
    });

    document.addEventListener('mouseup', (e) => {
      if (!listenerVol) return false;
      document.removeEventListener('mousemove', moveVol);
      listenerVol = false;
    });

    function moveVol(e: any) {
      if (!playerRef.current) return;
      const { width } = volBar.getBoundingClientRect();
      const x = e.clientX - volBar.getBoundingClientRect().left;
      let percentage = (x / width) * 100;
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      const volume = document.getElementById('volume')!;
      volume.style.width = `${percentage}%`;
      playerRef.current.volume = percentage / 100;
    }

    volBar.addEventListener('click', (e) => {
      if (!playerRef.current) return;
      const { width } = volBar.getBoundingClientRect();
      const x = e.clientX - volBar.getBoundingClientRect().left;
      let percentage = (x / width) * 100;
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      const volume = document.getElementById('volume')!;
      volume.style.width = `${percentage}%`;
      playerRef.current.volume = percentage / 100;
    });
  }, []);

  useEffect(() => {
    if (hls) {
      console.log('hls.levels', hls.levels);
      setLevels(hls.levels);
    }
  }, [quality, hls]);

  useEffect(() => {
    const videoPlayer = playerRef.current;

    if (videoPlayer) {
      if (isPlaying) {
        videoPlayer.play();
      } else {
        videoPlayer.pause();
      }
    }
  }, [isPlaying]);

  // ws.onmessage = (event) => {
  //   const data = JSON.parse(event.data);
  //   switch (data.type) {
  //     case 'emit_update_time':
  //       console.log({ emit_update_time: data });
  //       break;

  //     case 'joined_room':
  //       console.log({ joined_room: data });
  //       appendMessage({ type: 'notification', text: `${data.username} joined the room` });
  //       toggleChat(true);
  //       if (username == data.creator) {
  //         ws.send(
  //           JSON.stringify({
  //             type: 'update_time',
  //             new_time: playerRef.current?.currentTime || 0,
  //           })
  //         );
  //       }
  //       break;
  //   }
  // };
  const { classes, cx } = useStyles();

  return (
    <div className={classes.videoContainer} id="video-player">
      <div className={classes.loaderContainer} ref={loader}>
        <div className={classes.loader}></div>
      </div>
      <div className={classes.videoHeaders} id="video-header">
        <Image
          src={LeftArrowIcon}
          alt="Esc"
          width={25}
          height={25}
          className={classes.icon}
          onClick={toggleFullscreen}
        />
        <h2>Movie Title</h2>
        <div></div>
      </div>
      <video
        id="video"
        controls={false}
        ref={playerRef}
        autoPlay={false}
        className={classes.video}
      ></video>
      <div className={classes.controlsContainer} id="controls-container">
        <div className={classes.progressContainer}>
          <p className={classes.durations} id="current-time">
            00:00
          </p>
          <div
            id="progress-bar"
            className={classes.progressBar}
            onClick={(e: any) => {
              seek(e);
            }}
          >
            <div id="progress" className={classes.progress}></div>
            <div id="dot" className={classes.dot}></div>
          </div>
          <p className={classes.durations} id="duration">
            00:00
          </p>
        </div>
        <div className={classes.controls}>
          <div className={classes.flex}>
            {isPlaying ? (
              <Image
                src={PauseIcon}
                alt="PauseIcon"
                width={25}
                height={25}
                className={classes.icon}
                style={{ scale: 1.2 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  togglePlay();
                }}
              />
            ) : (
              <Image
                src={PlayIcon}
                alt="PlayIcon"
                width={25}
                height={25}
                className={classes.icon}
                style={{ scale: 1.2 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  togglePlay();
                }}
              />
            )}
            <Image
              src={SkipBackwardIcon}
              alt="SkipBackwardIcon"
              width={25}
              height={25}
              className={classes.icon}
              onClick={seekBackward}
            />
            <Image
              src={SkipForwardIcon}
              alt="SkipFowardIcon"
              width={25}
              height={25}
              className={classes.icon}
              onClick={seekForward}
            />
            <div className={cx(classes.relative, classes.flex)} ref={ref}>
              {mute ? (
                <Image
                  src={MuteVolumeIcon}
                  alt="Muted Volume"
                  width={25}
                  height={25}
                  className={classes.icon}
                  onClick={toggleMute}
                />
              ) : (
                <Image
                  src={VolumeIcon}
                  alt="PlayIcon"
                  width={25}
                  height={25}
                  className={classes.icon}
                  onClick={toggleMute}
                />
              )}
              <div
                className={cx(classes.popup, classes.volPopup)}
                style={{ display: hovered ? 'block' : 'none' }}
              >
                <div id="volume-bar" className={classes.volBar}>
                  <div id="volume" className={classes.volume}></div>
                  <div id="volume-dot" className={classes.volumeDot}></div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx(classes.flex, classes.gap)}>
            <button
              onClick={() => toggleChat(undefined)}
              className={cx(classes.partyWatch, classes.flex, classes.gap)}
            >
              <Image
                src={PartyWatchIcon}
                alt="PartyWatchIcon"
                width={25}
                height={25}
                className={classes.partyWatchIcon}
              />
              Party Watch
            </button>
            <div className={classes.relative}>
              <Image
                src={SettingsIcon}
                alt="Settings"
                width={25}
                height={25}
                className={cx(classes.icon, classes.rightIcons)}
                onClick={() => setShowPopup(!showPopup)}
              />
              {showPopup && (
                <div className={classes.popup}>
                  <div className={cx(classes.settingsOption, classes.spaceBetween)}>
                    <p>Quality</p>
                    <span>
                      <select
                        name="quality"
                        id="quality"
                        onChange={(e) => changeQuality(e.target.value)}
                        value={quality}
                      >
                        <option value="-1">Auto</option>
                        {levels.map((level: any, id: any) => (
                          <option value={id}>{level.name}</option>
                        ))}
                      </select>
                    </span>
                  </div>
                  <div className={cx(classes.settingsOption, classes.spaceBetween)}>
                    <p>Speed</p>
                    <span>
                      <select
                        name="speed"
                        id="speed"
                        onChange={(e) => changePlaybackRate(Number.parseFloat(e.target.value))}
                        value={playbackRate}
                      >
                        <option value={0.25}>0.25</option>
                        <option value={0.5}>0.5</option>
                        <option value={0.75}>0.75</option>
                        <option value={1}>1</option>
                        <option value={1.25}>1.25</option>
                        <option value={1.5}>1.5</option>
                        <option value={1.75}>1.75</option>
                        <option value={2}>2</option>
                      </select>
                    </span>
                  </div>
                </div>
              )}
            </div>
            <Image
              src={FullScreenIcon}
              alt="PlayIcon"
              width={25}
              height={25}
              className={cx(classes.icon, classes.rightIcons)}
              onClick={toggleFullscreen}
            />
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
};

export default VideoPlayer;

const useStyles = createStyles(() => ({
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '0rem 1rem',
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '100%',
    maxHeight: '100vh',
    minHeight: '100vh',
    overflowX: 'hidden',
    display: 'flex',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    background: '#000e',
  },
  controls: {
    // position: "absolute",
    // bottom: 0,
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '0rem 1rem',
  },
  icon: {
    margin: '1rem 0.2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '2rem',
    height: '2rem',
    zIndex: 10,
  },
  rightIcons: {
    width: '1.5rem',
    height: '1.5rem',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
  },
  partyWatchIcon: {
    height: '2.5rem',
  },
  partyWatch: {
    fontWeight: 'bold',
    color: 'white',
    verticalAlign: 'middle',
    marginLeft: '0.1rem',
    background: 'none',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  gap: {
    gap: '1rem',
  },
  progressContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
  },
  durations: {
    color: 'white',
    fontWeight: 'bold',
  },
  progressBar: {
    width: '100%',
    height: '5px',
    background: 'rgb(255, 255, 255, 0.7)',
    cursor: 'pointer',
    // position: "relative",
    display: 'flex',
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
    transition: 'transform 0.1s',
    '&:hover': {
      transform: 'translate(-5px, -2.7px) scale(1.5)',
    },
  },
  volumeDot: {
    // position: "absolute",
    transform: 'translateY(-2.7px)',
    height: '10px',
    width: '10px',
    background: 'white',
    borderRadius: '50%',
    transition: 'transform 0.1s',
    '&:hover': {
      transform: 'translateY(-2.7px) scale(1.5)',
    },
  },
  settingsOption: {
    color: 'white',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    select: {
      fontWeight: 'normal',
      backgroundColor: 'transparent',
      outline: 'none',
      border: '2px solid white',
      padding: '2px',
      color: 'white',
      borderRadius: '8px',
      option: {
        background: 'rgba(0, 0, 0, 0.5)',
      },
    },
  },
  loaderContainer: {
    width: '100%',
    height: '100%',
    display: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loader: {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #00664A',
    borderRadius: '50%',
    animation: `${spin} 0.5s linear infinite`,
  },
  relative: {
    position: 'relative',
  },
  popup: {
    position: 'absolute',
    borderRadius: '1rem',
    bottom: '210%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '1rem',
    transition: 'display 0.5s 2s',
  },
  volPopup: {
    position: 'static',
    backgroundColor: 'transparent',
    padding: 0,
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  volBar: {
    width: '100px',
    height: '5px',
    background: 'rgba(255, 255, 255, 0.7)',
    display: 'flex',
    cursor: 'pointer',
  },
  volume: {
    width: '100%',
    height: '100%',
    background: 'white',
  },
  videoHeaders: {
    position: 'absolute',
    top: 0,
    width: '100%',
    display: 'none',
    justifyContent: 'space-between',
    paddingLeft: '1rem',
    color: 'white',
    zIndex: 10,
    background:
      'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 80%)',
  },
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
    // padding: theme.spacing(4),
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between', // Buttons on opposite sides
  },
  button: {
    // padding: theme.spacing(2),
    backgroundColor: '#424242', // Button color
    color: '#fff', // Button text color
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
}));

const spin = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});
