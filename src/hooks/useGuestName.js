import { useEffect, useState } from "react";

export function useGuestName() {
  const [guestName, setGuestName] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    if (to) {
      setGuestName(to.replace(/\+/g, " "));
    }
  }, []);

  return guestName;
}
