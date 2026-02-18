import { useEffect, useRef } from "react";

const YOUTUBE_URL = "https://youtu.be/dt4Ueda_h6Y?si=d04Kvk2j7ESsaOqI";
const VIDEO_ID = new URL(YOUTUBE_URL).pathname.replace("/", "");
const API_SRC = "https://www.youtube.com/iframe_api";
const INTERACTION_EVENTS = ["pointerdown", "touchstart", "keydown", "wheel"];
const DEFAULT_VOLUME = 80;

function BackgroundMusic() {
  const playerRef = useRef(null);
  const containerIdRef = useRef(`bg-music-player-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    let isUnmounted = false;
    let listenersAttached = false;
    let hasAudioPermission = false;
    let playbackCheckTimeoutId = null;
    const previousReady = window.onYouTubeIframeAPIReady;

    const clearPlaybackCheck = () => {
      if (playbackCheckTimeoutId) {
        window.clearTimeout(playbackCheckTimeoutId);
        playbackCheckTimeoutId = null;
      }
    };

    const tryPlay = (forceUnmute = false) => {
      const player = playerRef.current;
      if (!player) {
        return;
      }

      try {
        if (forceUnmute) {
          hasAudioPermission = true;
          player.unMute?.();
          player.setVolume?.(DEFAULT_VOLUME);
        } else {
          player.mute?.();
        }

        player.playVideo?.();
      } catch {
        // noop
      }
    };

    const removeInteractionFallback = () => {
      if (!listenersAttached) {
        return;
      }

      INTERACTION_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, onFirstInteraction);
      });

      listenersAttached = false;
    };

    const onFirstInteraction = () => {
      tryPlay(true);
      removeInteractionFallback();
    };

    const addInteractionFallback = () => {
      if (listenersAttached) {
        return;
      }

      INTERACTION_EVENTS.forEach((eventName) => {
        window.addEventListener(eventName, onFirstInteraction, { passive: true, once: true });
      });

      listenersAttached = true;
    };

    const createPlayer = () => {
      if (isUnmounted || !window.YT?.Player) {
        return;
      }

      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }

      playerRef.current = new window.YT.Player(containerIdRef.current, {
        width: "1",
        height: "1",
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          loop: 1,
          mute: 1,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          playlist: VIDEO_ID
        },
        events: {
          onReady: (event) => {
            try {
              event.target.mute?.();
              event.target.setVolume?.(DEFAULT_VOLUME);
            } catch {
              // noop
            }

            tryPlay();
            addInteractionFallback();

            clearPlaybackCheck();
            playbackCheckTimeoutId = window.setTimeout(() => {
              const state = playerRef.current?.getPlayerState?.();
              if (state === window.YT.PlayerState.PLAYING) {
                return;
              }

              tryPlay();
              addInteractionFallback();
            }, 1600);
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING && hasAudioPermission) {
              removeInteractionFallback();
            }

            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo();
            }
          },
          onAutoplayBlocked: () => {
            addInteractionFallback();
          }
        }
      });
    };

    const handleApiReady = () => {
      if (typeof previousReady === "function") {
        previousReady();
      }
      createPlayer();
    };

    window.onYouTubeIframeAPIReady = handleApiReady;

    if (window.YT?.Player) {
      createPlayer();
    } else if (!document.querySelector(`script[src="${API_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = API_SRC;
      document.head.appendChild(script);
    }

    return () => {
      isUnmounted = true;
      clearPlaybackCheck();
      removeInteractionFallback();

      if (window.onYouTubeIframeAPIReady === handleApiReady) {
        window.onYouTubeIframeAPIReady = previousReady;
      }

      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed -left-[9999px] top-0 h-px w-px overflow-hidden opacity-0"
      aria-hidden="true"
    >
      <div id={containerIdRef.current} />
    </div>
  );
}

export default BackgroundMusic;
