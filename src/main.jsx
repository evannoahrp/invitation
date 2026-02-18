import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Suppress YouTube postMessage warnings
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0]?.includes && (
    args[0].includes("postMessage") ||
    args[0].includes("Failed to execute 'postMessage'")
  )) {
    return; // Suppress the postMessage warning
  }
  originalWarn.apply(console, args);
};

// Suppress YouTube API errors
const originalError = console.error;
console.error = (...args) => {
  if (args[0]?.includes && (
    args[0].includes("isExternalMethodAvailable") ||
    args[0].includes("YouTube")
  )) {
    return; // Suppress YouTube-related errors
  }
  originalError.apply(console, args);
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
