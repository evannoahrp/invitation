import { useEffect, useState } from "react";
import { getCountdownParts } from "../utils/time";

export function useCountdown(targetTime) {
  const [countdown, setCountdown] = useState(() => getCountdownParts(targetTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdownParts(targetTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  return countdown;
}
