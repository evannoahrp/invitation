function ToastMessage({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[var(--text)] px-5 py-2 text-sm text-white shadow-lg md:bottom-5">
      {message}
    </div>
  );
}

export default ToastMessage;
