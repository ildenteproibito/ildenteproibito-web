import React, { useState, useEffect, useRef } from 'react';
import { Locale, Track } from '@/types';
import { t } from '@/lib/utils';

interface YoutubeAudioPlayerProps {
  lang: Locale;
  volume: number;
  isMuted: boolean;
  isUnlocked: boolean;
}

const YT_PLAYLIST: Track[] = [
  { id: 'gKfjXIdtxHQ', start: 0 },
  { id: 'zFBLz98EI6g', start: 1 },
  { id: 'KarUBsI3VHo', start: 0 },
  { id: '5EpyN_6dqyk', start: 0 },
  { id: 'Zc4r7GGXAvw', start: 0 }, // BIA - WE ON GO
];

const YT_STATE = { ENDED: 0, PLAYING: 1, PAUSED: 2, CUED: 5 };

export default function YoutubeAudioPlayer({
  lang,
  volume,
  isMuted,
  isUnlocked,
}: YoutubeAudioPlayerProps) {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [trackTitle, setTrackTitle] = useState('Loading…');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isError, setIsError] = useState(false);

  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerReadyRef = useRef(false);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const embedPlayingRef = useRef(false);
  const isFileOriginRef = useRef(false);

  const trackIndexRef = useRef(trackIndex);
  trackIndexRef.current = trackIndex;

  const isUnlockedRef = useRef(isUnlocked);
  isUnlockedRef.current = isUnlocked;

  const isLoopingRef = useRef(isLooping);
  isLoopingRef.current = isLooping;

  const formatTime = (seconds: number) => {
    const s = Math.max(0, Math.floor(seconds || 0));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r.toString().padStart(2, '0')}`;
  };

  const fetchTitleForTrack = async (id: string) => {
    setTrackTitle(t('music.loading', lang));
    try {
      const url = `https://www.youtube.com/watch?v=${id}`;
      const res = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(url)}`);
      if (!res.ok) throw new Error('noembed');
      const data = await res.json();
      if (data.title) {
        setIsError(false);
        setTrackTitle(data.title);
        return;
      }
    } catch (_) {}
    setTrackTitle('YouTube');
  };

  const buildEmbedUrl = (track: Track, autoplay: boolean) => {
    const params = new URLSearchParams({
      enablejsapi: '1',
      controls: '0',
      modestbranding: '1',
      rel: '0',
      playsinline: '1',
      iv_load_policy: '3',
      start: String(track.start || 0),
    });
    if (autoplay) params.set('autoplay', '1');
    return `https://www.youtube-nocookie.com/embed/${track.id}?${params.toString()}`;
  };

  const embedCommand = (func: string, args?: any) => {
    if (!iframeRef.current?.contentWindow) return;
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func, args: args ?? '' }),
      '*'
    );
  };

  const applyVolume = (v: number, muted: boolean) => {
    const targetVol = muted ? 0 : Math.round(v * 100);
    if (isFileOriginRef.current) {
      if (playerReadyRef.current) embedCommand('setVolume', targetVol);
    } else if (playerReadyRef.current && playerRef.current) {
      try {
        playerRef.current.setVolume(targetVol);
      } catch (_) {}
    }
  };

  const startProgressTimer = () => {
    stopProgressTimer();
    if (isFileOriginRef.current) {
      progressTimerRef.current = setInterval(() => {
        embedCommand('getCurrentTime');
        embedCommand('getDuration');
      }, 400);
    } else {
      progressTimerRef.current = setInterval(() => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
          setCurrentTime(playerRef.current.getCurrentTime() || 0);
          setDuration(playerRef.current.getDuration() || 0);
        }
      }, 300);
    }
  };

  const stopProgressTimer = () => {
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    progressTimerRef.current = null;
  };

  const startPlayback = () => {
    if (isFileOriginRef.current) {
      loadTrackFile(trackIndexRef.current, true);
      return;
    }
    if (!playerReadyRef.current || !playerRef.current) return;
    const track = YT_PLAYLIST[trackIndexRef.current];
    playerRef.current.loadVideoById({ videoId: track.id, startSeconds: track.start });
    playerRef.current.playVideo();
    applyVolume(volume, isMuted);
  };

  const loadTrackFile = (index: number, autoplay: boolean) => {
    const resolvedIndex = ((index % YT_PLAYLIST.length) + YT_PLAYLIST.length) % YT_PLAYLIST.length;
    setTrackIndex(resolvedIndex);
    const track = YT_PLAYLIST[resolvedIndex];
    fetchTitleForTrack(track.id);

    if (iframeRef.current) {
      iframeRef.current.src = buildEmbedUrl(track, autoplay);
    }
    embedPlayingRef.current = autoplay;
    setIsPlaying(autoplay);
    if (autoplay) startProgressTimer();
  };

  const loadTrackApi = (index: number, autoplay: boolean) => {
    const resolvedIndex = ((index % YT_PLAYLIST.length) + YT_PLAYLIST.length) % YT_PLAYLIST.length;
    setTrackIndex(resolvedIndex);
    const track = YT_PLAYLIST[resolvedIndex];
    fetchTitleForTrack(track.id);

    if (!playerReadyRef.current || !playerRef.current) return;
    const opts = { videoId: track.id, startSeconds: track.start };
    if (autoplay) {
      playerRef.current.loadVideoById(opts);
    } else {
      playerRef.current.cueVideoById(opts);
    }
  };

  const loadTrack = (index: number, autoplay: boolean) => {
    if (isFileOriginRef.current) {
      loadTrackFile(index, autoplay);
    } else {
      loadTrackApi(index, autoplay);
    }
  };

  const handleTrackEnd = () => {
    if (isLoopingRef.current) {
      // Se è attivo il Loop, fai ripartire la traccia corrente
      if (isFileOriginRef.current) {
        loadTrackFile(trackIndexRef.current, true);
      } else if (playerRef.current) {
        const track = YT_PLAYLIST[trackIndexRef.current];
        playerRef.current.seekTo(track.start || 0, true);
        playerRef.current.playVideo();
      }
    } else {
      // Altrimenti passa alla prossima
      loadTrack(trackIndexRef.current + 1, true);
    }
  };

  const playCurrent = () => {
    if (isFileOriginRef.current) {
      if (!playerReadyRef.current) return;
      if (embedPlayingRef.current) {
        embedCommand('pauseVideo');
        embedPlayingRef.current = false;
        setIsPlaying(false);
        stopProgressTimer();
      } else {
        loadTrackFile(trackIndexRef.current, true);
      }
      return;
    }

    if (!playerReadyRef.current || !playerRef.current) return;
    const state = playerRef.current.getPlayerState();
    if (state === YT_STATE.PLAYING) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
      stopProgressTimer();
    } else if (state === YT_STATE.PAUSED || state === YT_STATE.CUED) {
      playerRef.current.playVideo();
    } else {
      startPlayback();
    }
  };

  const handlePlayPause = () => {
    if (!isUnlockedRef.current) return;
    playCurrent();
  };

  const handleNext = () => {
    if (!playerReadyRef.current) return;
    loadTrack(trackIndexRef.current + 1, true);
  };

  const handlePrev = () => {
    if (!playerReadyRef.current) return;
    loadTrack(trackIndexRef.current - 1, true);
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerReadyRef.current || !isUnlockedRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));

    if (isFileOriginRef.current) {
      if (duration > 0) {
        embedCommand('seekTo', `${duration * ratio},true`);
      }
      return;
    }

    if (playerRef.current) {
      const dur = playerRef.current.getDuration() || 0;
      if (dur > 0) playerRef.current.seekTo(dur * ratio, true);
    }
  };

  const handleProgressKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!playerReadyRef.current || !isUnlockedRef.current) return;
    const step = e.key === 'ArrowRight' ? 5 : e.key === 'ArrowLeft' ? -5 : 0;
    if (!step) return;
    e.preventDefault();

    if (isFileOriginRef.current) {
      if (duration > 0) {
        embedCommand('seekTo', `${Math.min(duration, Math.max(0, currentTime + step))},true`);
      }
      return;
    }

    if (playerRef.current) {
      const dur = playerRef.current.getDuration() || 0;
      if (!dur) return;
      const cur = playerRef.current.getCurrentTime() || 0;
      playerRef.current.seekTo(Math.min(dur, Math.max(0, cur + step)), true);
    }
  };

  useEffect(() => {
    applyVolume(volume, isMuted);
  }, [volume, isMuted]);

  useEffect(() => {
    if (isUnlocked && playerReadyRef.current) {
      startPlayback();
    }
  }, [isUnlocked]);

  useEffect(() => {
    isFileOriginRef.current = window.location.protocol === 'file:';

    const onPlayerReady = () => {
      playerReadyRef.current = true;
      applyVolume(volume, isMuted);
      if (isUnlockedRef.current) {
        startPlayback();
      } else {
        loadTrackApi(trackIndexRef.current, false);
      }
    };

    const onPlayerStateChange = (event: any) => {
      if (event.data === YT_STATE.PLAYING) {
        setIsPlaying(true);
        startProgressTimer();
      } else if (event.data === YT_STATE.PAUSED) {
        setIsPlaying(false);
        stopProgressTimer();
      } else if (event.data === YT_STATE.ENDED) {
        handleTrackEnd();
      } else if (event.data === YT_STATE.CUED) {
        if (playerRef.current && typeof playerRef.current.getDuration === 'function') {
          setDuration(playerRef.current.getDuration() || 0);
        }
      }
    };

    const loadYouTubeApi = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        if ((window as any).YT && (window as any).YT.Player) {
          resolve();
          return;
        }

        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.async = true;
        tag.onerror = () => reject(new Error('YouTube API block'));
        document.head.appendChild(tag);

        (window as any).onYouTubeIframeAPIReady = () => {
          resolve();
        };
      });
    };

    const initPlayer = () => {
      playerRef.current = new (window as any).YT.Player('youtubePlayerHost', {
        width: 320,
        height: 180,
        videoId: YT_PLAYLIST[0].id,
        host: 'https://www.youtube-nocookie.com',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          iv_load_policy: 3,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
          onError: () => setIsError(true),
        },
      });
    };

    const handleWindowMessage = (e: MessageEvent) => {
      if (!isFileOriginRef.current || !/^https:\/\/(www\.)?youtube\.com$/.test(e.origin)) return;
      let data;
      try {
        data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
      } catch (_) {
        return;
      }

      if (data.event === 'onStateChange') {
        if (data.info === YT_STATE.PLAYING) {
          embedPlayingRef.current = true;
          setIsPlaying(true);
          startProgressTimer();
        } else if (data.info === YT_STATE.PAUSED) {
          embedPlayingRef.current = false;
          setIsPlaying(false);
          stopProgressTimer();
        } else if (data.info === YT_STATE.ENDED) {
          handleTrackEnd();
        }
      }

      if (data.info && typeof data.info === 'object') {
        if (data.info.currentTime != null) {
          setCurrentTime(data.info.currentTime);
        }
        if (data.info.duration != null) {
          setDuration(data.info.duration);
        }
      }
    };

    if (isFileOriginRef.current) {
      playerReadyRef.current = true;
      setIsPlaying(false);
      loadTrackFile(0, false);
      window.addEventListener('message', handleWindowMessage);
    } else {
      loadYouTubeApi()
        .then(() => {
          initPlayer();
        })
        .catch(() => {
          setIsError(true);
        });
    }

    return () => {
      stopProgressTimer();
      window.removeEventListener('message', handleWindowMessage);
    };
  }, []);

  useEffect(() => {
    fetchTitleForTrack(YT_PLAYLIST[trackIndex].id);
  }, [trackIndex, lang]);

  const progressPct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div className={`music-player ${isError ? 'is-error' : ''}`} id="musicPlayer">
      <div className="music-player-inner">
        <div className="track-info-block">
          <div className="track-thumb-wrap">
            <img
              className="track-thumb music-cover"
              id="musicThumb"
              src={`https://i.ytimg.com/vi/${YT_PLAYLIST[trackIndex].id}/hqdefault.jpg`}
              alt=""
              width="42"
              height="42"
            />
            <span className="music-yt-mark" title="YouTube">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                  fill="#FF0000"
                  d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.5 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.5 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
                />
                <path fill="#FFFFFF" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </span>
          </div>
          <div className="track-text-details">
            <div className="music-source">{t('music.fromYoutube', lang)}</div>
            <div className="track-title" id="musicTitle">
              {isError ? t('music.error', lang) : trackTitle}
            </div>
            <div className="time-row">
              <span id="musicTimeCurrent">{formatTime(currentTime)}</span>
              <div
                className="progress-bar-container"
                id="musicProgressBar"
                role="slider"
                tabIndex={0}
                aria-label={t('music.progress', lang)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progressPct)}
                onClick={handleProgressClick}
                onKeyDown={handleProgressKeyDown}
              >
                <div
                  className="progress-current"
                  id="musicProgressFill"
                  style={{ width: `${progressPct}%` }}
                ></div>
              </div>
              <span id="musicTimeTotal">{formatTime(duration)}</span>
            </div>
          </div>
        </div>
        <div className="player-controls">
          <button
            type="button"
            className="control-btn btn-prev"
            id="musicPrev"
            aria-label={t('music.prev', lang)}
            onClick={handlePrev}
          ></button>
          
          <button
            type="button"
            className={`control-btn btn-play-pause ${isPlaying ? 'is-playing' : ''}`}
            id="musicPlayPause"
            aria-label={t(isPlaying ? 'music.pause' : 'music.play', lang)}
            onClick={handlePlayPause}
          ></button>

          <button
            type="button"
            className="control-btn btn-next"
            id="musicNext"
            aria-label={t('music.next', lang)}
            onClick={handleNext}
          ></button>

          {/* Tasto Loop Spostato a destra per coerenza UI Spotify/Apple */}
          <button
            type="button"
            className={`control-btn btn-loop ${isLooping ? 'is-active' : ''}`}
            id="musicLoop"
            aria-label="Toggle Loop"
            onClick={toggleLoop}
          ></button>
        </div>
      </div>
      <div id="youtubePlayerHost" className="youtube-audio-host" aria-hidden="true"></div>
    </div>
  );
}