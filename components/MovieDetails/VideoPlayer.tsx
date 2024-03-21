import React, { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoPlayerProps {
  defaultQuality?: string; // Optional prop for default quality
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ defaultQuality = 'auto' }) => {
  const [src] = useState<string>('http://localhost:5000/videos/output.m3u8');
  const playerRef = useRef<any>(null);
  const [quality, setQuality] = useState<string>(defaultQuality);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hls, setHls] = useState<Hls>();
  const [mute, setMute] = useState('mute');
  const [progress, setProgress] = useState(0);

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

  // Effect to attach hls.js event listeners to the player
  useEffect(() => {
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
      playerRef.current.addEventListener('click', togglePlay);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }
  }, []);
  useEffect(() => {
    if (hls) {
      console.log('hls.levels', hls.levels);
      setLevels(hls.levels);
    }
  }, [quality, hls]);

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
      {/* <video id="video" controls ref={playerRef} height={758} width={1440}></video> */}
      <div>
        Quality:
        <select onChange={(e) => changeQuality(e.target.value)} value={quality}>
          <option value="-1">Auto</option>
          {levels.map((level: any, id: any) => (
            <option value={id}>{level.name}</option>
          ))}
        </select>
      </div>
      <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
      <div
        id="progress-bar"
        style={{ width: '100%', height: '5px', background: '#ddd', cursor: 'pointer' }}
        onClick={(e: any) => {
          seek(e);
        }}
      >
        <div id="progress" style={{ height: '100%', background: ' #666', width: '0%' }}></div>
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