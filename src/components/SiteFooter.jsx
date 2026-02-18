function SiteFooter({ brand }) {
  return (
    <footer className="border-t border-[var(--border)]/70 pb-24 pt-8 text-center text-sm text-[var(--text-soft)] md:pb-8">
      <p className="font-heading text-2xl">{brand}</p>
      <p className="mt-2">Thank you for your prayers, kind attention, and cherished presence.</p>
    </footer>
  );
}

export default SiteFooter;
