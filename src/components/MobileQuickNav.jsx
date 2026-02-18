import { CalendarDays, Images, Send, Users2 } from "lucide-react";

const ICON_BY_SECTION = {
  events: CalendarDays,
  profiles: Users2,
  gallery: Images,
  rsvp: Send
};

function MobileQuickNav({ navItems, activeSection, onNavigate }) {
  return (
    <nav className="mobile-nav md:hidden" aria-label="Quick navigation">
      {navItems.map((item) => {
        const Icon = ICON_BY_SECTION[item.id] || CalendarDays;
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            className={`mobile-nav-btn ${isActive ? "is-active" : ""}`}
            onClick={() => onNavigate(item.id)}
            type="button"
          >
            <Icon size={16} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default MobileQuickNav;
