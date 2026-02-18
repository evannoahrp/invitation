function SiteHeader({ brand, navItems, activeSection, onNavigate }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)]/70 bg-[var(--bg)]/75 backdrop-blur-md">
      <nav className="container-shell flex items-center justify-between py-4">
        <button className="font-heading text-lg tracking-wide" onClick={() => onNavigate("home")} type="button">
          {brand}
        </button>

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

      </nav>
    </header>
  );
}

export default SiteHeader;
