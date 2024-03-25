import React, { useState, useEffect, useRef } from 'react';
import HlsPlayer from 'react-hls-player';
import Hls from 'hls.js';

interface VideoPlayerProps {
  defaultQuality?: string; // Optional prop for default quality
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ defaultQuality = 'auto' }) => {
  const playerRef = useRef<any>(null);
  const [quality, setQuality] = useState<string>(defaultQuality);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hls, setHls] = useState<Hls>();
  const [isLoading, setIsLoading] = useState(false);
  const [levels, setLevels] = useState<any>([]); // State to store the available quality levels
  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pause();
      } else {
        playerRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  function toggleMute() {
    playerRef.current.muted = !playerRef.current.muted;
    document.getElementById('mute-btn')!.textContent = playerRef.current.muted ? 'Unmute' : 'Mute';
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().catch((err: any) => {
        alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  function updateProgress() {
    const progress = document.getElementById('progress')!;
    const percentage = (playerRef.current.currentTime / playerRef.current.duration) * 100;
    progress.style.width = `${percentage}%`;
  }
  function updateProgress1(data: any) {
    console.log('playerRef.current', data);
    const progress = document.getElementById('progress1')!;
    if (playerRef.current && playerRef.current.buffered.length > 0) {
      const bufferedEnd = playerRef.current.buffered.end(0);
      const duration = playerRef.current.duration;
      const percentage = (bufferedEnd / duration) * 100;
      progress.style.width = `${percentage}%`;
    }
  }

  function seek(event: any) {
    const progressBar = document.getElementById('progress-bar')!;

    const bounds = progressBar.getBoundingClientRect();
    const percent = (event.clientX - bounds.left) / bounds.width;
    playerRef.current.currentTime = percent * playerRef.current.duration;
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
  const changePlaybackRate = (rate: number) => {
    if (playerRef.current) {
      playerRef.current.playbackRate = rate;
    }
  };
  // Effect to attach hls.js event listeners to the player
  useEffect(() => {
    const video = document.getElementById('video') as HTMLMediaElement;
    const videoSrc = 'https://mflix-vids.s3.amazonaws.com/movies/1711281378854/master.m3u8';

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
      // hls.on(Hls.Events.BUFFER_APPENDING, (data) => {
      //   // setIsLoading(true); // Set loading to true when buffering starts
      //   console.log('Buffer_Appending', data);
      // });
      // hls.on(Hls.Events.BUFFER_CREATED, (data) => {
      //   console.log('Buffer_Created', data);
      //   setIsLoading(true); // Set loading to true when buffering starts
      // });

      // // Event for when buffering is complete
      // hls.on(Hls.Events.BUFFER_APPENDED, (data) => {
      //   console.log('Buffer_Appended', data);
      //   setIsLoading(false); // Set loading to false when buffering ends
      // });

      playerRef.current.addEventListener('timeupdate', updateProgress);
      playerRef.current.addEventListener('timeupdate', updateProgress1);
      playerRef.current.addEventListener('click', togglePlay);
      playerRef.current.addEventListener('waiting', () => {
        setIsLoading(true);
      });
      playerRef.current.addEventListener('playing', () => {
        setIsLoading(false);
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }
  }, []);
  useEffect(() => {
    if (hls) {
      console.log('hls.levels', hls.levels[0]);
      setLevels(hls.levels);
    }
  }, [quality, hls, hls?.levels]);
  useEffect(() => {
    document.addEventListener('keyup', (e) => {
      if (e.key == 'PrintScreen') {
        navigator.clipboard.writeText('');
        alert('Screenshots disabled!');
      }
    });
  }, []);
  return (
    <div>
      {/* <HlsPlayer
        playerRef={playerRef}
        src={src}
        hlsConfig={{
          maxLoadingDelay: 4,
          minAutoBitrate: 0,
          lowLatencyMode: false,
        }}
        controls={true}
      /> */}
      <video id="video" ref={playerRef} height={500} width={1000}></video>
      {isLoading && <div>Loading...</div>}
      {/* Playback rate control */}
      <div>
        Playback Speed:
        <select onChange={(e) => changePlaybackRate(parseFloat(e.target.value))} defaultValue="1">
          <option value="0.5">0.5x</option>
          <option value="0.75">0.75x</option>
          <option value="1">Normal</option>
          <option value="1.25">1.25x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>
      <div>
        Quality:
        <select onChange={(e) => changeQuality(e.target.value)} value={quality}>
          <option value="-1">Auto</option>
          {levels.map((level: any, id: any) => (
            <option value={id}>{level.name}</option>
          ))}
        </select>
      </div>
      <button onClick={togglePlay}>{isPlaying ? 'Paus' : 'Play'}</button>
      <div
        id="progress-bar"
        style={{
          width: '100%',
          height: '5px',
          background: '#ddd',
          cursor: 'pointer',
          position: 'relative',
        }}
        onClick={(e: any) => {
          seek(e);
        }}
      >
        <div
          id="progress"
          style={{
            height: '100%',
            background: ' #666',
            width: '0%',
            position: 'absolute',
            zIndex: 2,
          }}
        ></div>
        <div
          id="progress1"
          style={{
            height: '100%',
            background: ' red',
            width: '0%',
            position: 'absolute',
            zIndex: 1,
          }}
        ></div>
      </div>
      <button id="mute-btn" onClick={toggleMute}>
        Mute
      </button>
      <button id="fullscreen-btn" onClick={toggleFullscreen}>
        Fullscreen
      </button>
    </div>
  );
};

export default VideoPlayer;
