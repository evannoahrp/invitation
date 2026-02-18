import { useEffect } from "react";

export function useOnClickOutside(ref, onOutside) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      onOutside();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onOutside, ref]);
}
