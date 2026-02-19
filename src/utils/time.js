export function getCountdownParts(targetTime) {
  const distance = targetTime - Date.now();

  if (distance <= 0) {
    return { ended: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    ended: false,
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60)
  };
}

export function padNumber(value) {
  return String(value).padStart(2, "0");
}

export function formatEventDate(timestamp, locale = "en-US", timeZone = "Asia/Jakarta") {
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone
  }).format(timestamp);
}
