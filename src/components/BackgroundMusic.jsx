import { useEffect, useRef } from "react";

const VIDEO_ID = "dt4Ueda_h6Y";
const API_SRC = "https://www.youtube.com/iframe_api";

function BackgroundMusic() {
  const playerRef = useRef(null);
  const containerIdRef = useRef(`bg-music-player-${Math.random().toString(36).slice(2)}`);

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
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          playlist: VIDEO_ID
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo();
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
