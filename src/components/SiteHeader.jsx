import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

function SiteHeader({ brand, navItems, activeSection, onNavigate, isMusicMuted, onToggleMusic }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return; // Desktop: header always visible

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollYRef.current;

      // Mobile: hide when scrolling down, unless near top
      setIsVisible(!isScrollingDown || currentScrollY < 100);

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-[var(--border)]/70 bg-[var(--bg)]/75 backdrop-blur-md transition-transform duration-300 translate-y-0">
        <nav className="container-shell flex items-center justify-between py-4">
          <button className="font-heading text-lg tracking-[0.08em] text-(--accent)" onClick={() => onNavigate("home")} type="button">
            {brand}
          </button>

          <div className="flex items-center gap-2">
            <div className="hidden gap-2 md:flex">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`nav-btn ${activeSection === item.id ? "is-active" : ""}`}
                  onClick={() => onNavigate(item.id)}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              className="nav-btn px-3"
              onClick={onToggleMusic}
              type="button"
              aria-label={isMusicMuted ? "Unmute background music" : "Mute background music"}
              title={isMusicMuted ? "Unmute background music" : "Mute background music"}
            >
              {isMusicMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span className="hidden sm:inline">{isMusicMuted ? "Unmute" : "Mute"}</span>
            </button>
          </div>
        </nav>
      </header>
      <div className="h-18.25" />
    </>
  );
}

export default SiteHeader;
