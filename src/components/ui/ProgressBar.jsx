function ProgressBar({ value }) {
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
      <div className="h-full bg-[var(--accent)] transition-[width] duration-200" style={{ width: `${value}%` }} />
    </div>
  );
}

export default ProgressBar;
