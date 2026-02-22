import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";

const YOUTUBE_URL = "https://youtu.be/DNbKs0Na_sc?si=ZejG7424uf3ull39";
const VIDEO_ID = new URL(YOUTUBE_URL).pathname.replace("/", "");
const API_SRC = "https://www.youtube.com/iframe_api";
const DEFAULT_VOLUME = 80;

const BackgroundMusic = forwardRef(function BackgroundMusic({ isMuted = true }, ref) {
  const playerRef = useRef(null);
  const containerIdRef = useRef(`bg-music-player-${Math.random().toString(36).slice(2)}`);
  const mutedRef = useRef(isMuted);
  const warnedKeysRef = useRef(new Set());
  const needsGestureUnlockRef = useRef(false);
  const unregisterGestureUnlockRef = useRef(null);

  const reportIssue = useCallback((key, message, error) => {
    if (!import.meta.env.DEV || warnedKeysRef.current.has(key)) {
      return;
    }

    warnedKeysRef.current.add(key);
    console.warn(`[BackgroundMusic] ${message}`, error);
  }, []);

  const clearGestureUnlock = useCallback(() => {
    if (typeof unregisterGestureUnlockRef.current === "function") {
      unregisterGestureUnlockRef.current();
      unregisterGestureUnlockRef.current = null;
    }
  }, []);

  const registerGestureUnlock = useCallback(() => {
    if (unregisterGestureUnlockRef.current || typeof document === "undefined") {
      return;
    }

    const unlock = () => {
      const player = playerRef.current;
      if (!player || mutedRef.current) {
        return;
      }

      try {
        player.unMute?.();
        player.setVolume?.(DEFAULT_VOLUME);
        player.playVideo?.();
        needsGestureUnlockRef.current = false;
        clearGestureUnlock();
      } catch (error) {
        reportIssue("gesture-unlock", "Unable to unlock background music via user gesture.", error);
      }
    };

    document.addEventListener("pointerdown", unlock, { passive: true });
    document.addEventListener("keydown", unlock);

    unregisterGestureUnlockRef.current = () => {
      document.removeEventListener("pointerdown", unlock);
      document.removeEventListener("keydown", unlock);
    };
  }, [clearGestureUnlock, reportIssue]);

  const applyMuteState = useCallback((nextMuted, forcePlay = false) => {
    mutedRef.current = nextMuted;
    const player = playerRef.current;

    if (nextMuted) {
      needsGestureUnlockRef.current = false;
      clearGestureUnlock();
    }

    if (!player) {
      if (!nextMuted) {
        needsGestureUnlockRef.current = true;
        registerGestureUnlock();
      }
      return;
    }

    try {
      if (nextMuted) {
        player.mute?.();
      } else {
        player.unMute?.();
        player.setVolume?.(DEFAULT_VOLUME);
        if (player.isMuted?.()) {
          needsGestureUnlockRef.current = true;
          registerGestureUnlock();
        } else {
          needsGestureUnlockRef.current = false;
          clearGestureUnlock();
        }
      }

      if (forcePlay || player.getPlayerState?.() !== window.YT?.PlayerState.PLAYING) {
        player.playVideo?.();
      }
    } catch (error) {
      if (!nextMuted) {
        needsGestureUnlockRef.current = true;
        registerGestureUnlock();
      }
      reportIssue("apply-mute-state", "Unable to apply mute/playback state.", error);
    }
  }, [clearGestureUnlock, registerGestureUnlock, reportIssue]);

  useImperativeHandle(ref, () => ({
    setMuted(nextMuted) {
      applyMuteState(Boolean(nextMuted), true);
    },
    play() {
      try {
        playerRef.current?.playVideo?.();
      } catch (error) {
        reportIssue("manual-play", "Manual play request was blocked.", error);
      }
    }
  }), [applyMuteState, reportIssue]);

  useEffect(() => {
    applyMuteState(isMuted, true);
  }, [applyMuteState, isMuted]);

  useEffect(() => {
    let isUnmounted = false;
    const previousReady = window.onYouTubeIframeAPIReady;

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
              event.target.setVolume?.(DEFAULT_VOLUME);
              applyMuteState(mutedRef.current, true);
            } catch (error) {
              reportIssue("ready-handler", "Failed to initialize background music player.", error);
            }
          },
          onStateChange: (event) => {
            try {
              if (event.data === window.YT.PlayerState.ENDED) {
                event.target.playVideo();
              }
            } catch (error) {
              reportIssue("state-change", "Unable to keep background music looping.", error);
            }
          },
          onAutoplayBlocked: () => {
            try {
              if (!mutedRef.current) {
                needsGestureUnlockRef.current = true;
                registerGestureUnlock();
              }
            } catch (error) {
              reportIssue("autoplay-blocked", "Autoplay was blocked by the browser.", error);
            }
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
      script.onerror = (error) => {
        reportIssue("api-load", "Failed to load YouTube Iframe API script.", error);
      };
      document.head.appendChild(script);
    }

    return () => {
      isUnmounted = true;

      if (window.onYouTubeIframeAPIReady === handleApiReady) {
        window.onYouTubeIframeAPIReady = previousReady;
      }

      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }

      clearGestureUnlock();
    };
  }, [applyMuteState, clearGestureUnlock, registerGestureUnlock, reportIssue]);

  return (
    <div
      className="pointer-events-none fixed -left-[9999px] top-0 h-px w-px overflow-hidden opacity-0"
      aria-hidden="true"
    >
      <div id={containerIdRef.current} />
    </div>
  );
});

export default BackgroundMusic;
