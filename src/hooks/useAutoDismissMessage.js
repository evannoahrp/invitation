import { useEffect, useState } from "react";

export function useAutoDismissMessage(durationMs = 2200) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!message) return undefined;

    const timeout = setTimeout(() => setMessage(""), durationMs);
    return () => clearTimeout(timeout);
  }, [durationMs, message]);

  return [message, setMessage];
}
