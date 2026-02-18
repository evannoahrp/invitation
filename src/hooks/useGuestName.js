import { useEffect, useState } from "react";

export function useGuestName() {
  const [guestName, setGuestName] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name") || params.get("to");
    if (name) {
      setGuestName(name.replace(/\+/g, " "));
    }
  }, []);

  return guestName;
}
