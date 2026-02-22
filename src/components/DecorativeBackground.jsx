import { useEffect, useState } from "react";
import flowers1 from "../assets/floral/flowers1.svg";
import flowers2 from "../assets/floral/flowers2.svg";
import flowers3 from "../assets/floral/flowers3.svg";
import flowers4 from "../assets/floral/flowers4.svg";

function DecorativeBackground() {
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    let frameId = null;

    const handleScroll = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        setParallaxOffset(window.scrollY * 0.045);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="decorative-bg pointer-events-none inset-0 z-0 overflow-hidden">
      <div className="decor-base-layer" />
      <div className="decor-floral-shadow-layer" />

      <div className="decor-floral-layer">
        <div className="decor-floral-sub-layer floral-depth-1" style={{ transform: `translate3d(0, ${parallaxOffset * 0.05}px, 0)` }}>
          <img
            src={flowers1}
            alt=""
            aria-hidden="true"
            className="floral-asset floral-top-left"
            style={{ transform: "rotate(-4.2deg)" }}
          />
        </div>

        <div className="decor-floral-sub-layer floral-depth-2" style={{ transform: `translate3d(0, ${parallaxOffset * 0.15}px, 0)` }}>
          <img
            src={flowers2}
            alt=""
            aria-hidden="true"
            className="floral-asset floral-bottom-right"
            style={{ transform: "rotate(3.6deg)" }}
          />
        </div>

        <div className="decor-floral-sub-layer floral-depth-3" style={{ transform: `translate3d(0, ${parallaxOffset * 0.15}px, 0)` }}>
          <img
            src={flowers3}
            alt=""
            aria-hidden="true"
            className="floral-asset floral-mid-left"
            style={{ transform: "rotate(-2.7deg)" }}
          />
        </div>

        <div className="decor-floral-sub-layer floral-depth-4" style={{ transform: `translate3d(0, ${parallaxOffset * 0.05}px, 0)` }}>
          <img
            src={flowers4}
            alt=""
            aria-hidden="true"
            className="floral-asset floral-mid-right"
            style={{ transform: "rotate(2.2deg)" }}
          />
        </div>
      </div>

      <div className="decor-highlight-layer" />
      <div className="decor-vignette" />
      <div className="decor-grain" />
    </div>
  );
}

export default DecorativeBackground;
