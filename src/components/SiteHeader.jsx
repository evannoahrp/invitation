import { Volume2, VolumeX } from "lucide-react";

function SiteHeader({ brand, navItems, activeSection, onNavigate, isMusicMuted, onToggleMusic }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)]/70 bg-[var(--bg)]/75 backdrop-blur-md">
      <nav className="container-shell flex items-center justify-between py-4">
        <button className="font-heading text-lg tracking-wide" onClick={() => onNavigate("home")} type="button">
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
  );
}

export default SiteHeader;
