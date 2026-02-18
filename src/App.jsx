import { useCallback, useEffect, useRef, useState } from "react";
import BackgroundMusic from "./components/BackgroundMusic";
import DecorativeBackground from "./components/DecorativeBackground";
import MobileQuickNav from "./components/MobileQuickNav";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import EventsSection from "./components/sections/EventsSection";
import GallerySection from "./components/sections/GallerySection";
import GiftsSection from "./components/sections/GiftsSection";
import HeroSection from "./components/sections/HeroSection";
import ProfilesSection from "./components/sections/ProfilesSection";
import RsvpSection from "./components/sections/RsvpSection";
import ProgressBar from "./components/ui/ProgressBar";
import ToastMessage from "./components/ui/ToastMessage";
import {
  ATTENDANCE_OPTIONS,
  BANK_ACCOUNTS,
  COUPLE_BIODATA,
  EVENT_CARDS,
  GALLERY,
  INVITATION_BRAND,
  NAV_ITEMS,
  WEDDING_DATE
} from "./constants/invitationData";
import { useActiveSection } from "./hooks/useActiveSection";
import { useAutoDismissMessage } from "./hooks/useAutoDismissMessage";
import { useCountdown } from "./hooks/useCountdown";
import { useGuestName } from "./hooks/useGuestName";
import { useScrollProgress } from "./hooks/useScrollProgress";
import { scrollToId } from "./utils/dom";

async function requestRsvpApi(options) {
  const response = await fetch("/api/rsvp", options);

  if (response.ok) {
    return response;
  }

  let message = "Unable to complete RSVP request.";

  try {
    const body = await response.json();
    if (body?.message) {
      message = body.message;
    }
  } catch {
    // keep default message when response is not JSON
  }

  throw new Error(message);
}

function App() {
  const countdown = useCountdown(WEDDING_DATE);
  const scrollProgress = useScrollProgress();
  const guestName = useGuestName();
  const activeSection = useActiveSection(NAV_ITEMS.map((item) => item.id));
  const [toast, setToast] = useAutoDismissMessage();
  const [copiedKey, setCopiedKey] = useState("");
  const [form, setForm] = useState({
    name: "",
    attendance: "",
    message: ""
  });
  const [responses, setResponses] = useState([]);
  const [isLoadingRsvp, setIsLoadingRsvp] = useState(true);
  const copyResetTimeoutRef = useRef(null);

  useEffect(() => {
    const supportsScrollRestoration = "scrollRestoration" in window.history;
    const previousRestoration = supportsScrollRestoration ? window.history.scrollRestoration : null;

    if (supportsScrollRestoration) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    return () => {
      if (supportsScrollRestoration && previousRestoration) {
        window.history.scrollRestoration = previousRestoration;
      }
    };
  }, []);

  useEffect(
    () => () => {
      if (copyResetTimeoutRef.current) {
        clearTimeout(copyResetTimeoutRef.current);
      }
    },
    []
  );

  useEffect(() => {
    let mounted = true;

    const loadRsvpEntries = async () => {
      try {
        const response = await requestRsvpApi({ method: "GET" });
        const data = await response.json();

        if (mounted) {
          setResponses(Array.isArray(data) ? data : []);
        }
      } catch {
        if (mounted) {
          setToast("RSVP records are currently unavailable.");
        }
      } finally {
        if (mounted) {
          setIsLoadingRsvp(false);
        }
      }
    };

    loadRsvpEntries();

    return () => {
      mounted = false;
    };
  }, [setToast]);

  const navigateToSection = useCallback((id) => {
    scrollToId(id);
  }, []);

  const updateFormField = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleCopyAccount = useCallback(async (value, key) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setToast("The account number has been copied successfully.");

      if (copyResetTimeoutRef.current) {
        clearTimeout(copyResetTimeoutRef.current);
      }

      copyResetTimeoutRef.current = setTimeout(() => {
        setCopiedKey("");
      }, 1400);
    } catch {
      setToast("Copying was unsuccessful. Kindly copy the account number manually.");
    }
  }, [setToast]);

  const handleSubmitRsvp = useCallback(async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.attendance) {
      setToast("Name and attendance confirmation are required.");
      return;
    }

    try {
      const response = await requestRsvpApi({
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name.trim(),
          attendance: form.attendance,
          message: form.message.trim()
        })
      });

      if (!response.ok) {
        throw new Error("RSVP submit failed");
      }

      const savedEntry = await response.json();
      setResponses((prev) => [savedEntry, ...prev].slice(0, 20));
      setForm((prev) => ({ ...prev, attendance: "", message: "" }));
      setToast("Thank you. Your RSVP has been received.");
    } catch {
      setToast("Your RSVP could not be submitted. Please try again.");
    }
  }, [form.attendance, form.message, form.name, setResponses, setToast]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--bg)] text-[var(--text)]">
      <BackgroundMusic />
      <DecorativeBackground />
      <ProgressBar value={scrollProgress} />

      <SiteHeader
        brand={INVITATION_BRAND}
        navItems={NAV_ITEMS}
        activeSection={activeSection}
        onNavigate={navigateToSection}
      />

      <main className="container-shell space-y-16 py-10 md:space-y-24">
        <HeroSection
          brand={INVITATION_BRAND}
          guestName={guestName}
          countdown={countdown}
          onNavigate={navigateToSection}
        />
        <EventsSection events={EVENT_CARDS} />
        <ProfilesSection profiles={COUPLE_BIODATA} />
        <GallerySection images={GALLERY} />
        <GiftsSection accounts={BANK_ACCOUNTS} copiedKey={copiedKey} onCopy={handleCopyAccount} />
        <RsvpSection
          form={form}
          attendanceOptions={ATTENDANCE_OPTIONS}
          onFieldChange={updateFormField}
          onAttendanceChange={(attendance) => updateFormField("attendance", attendance)}
          onSubmit={handleSubmitRsvp}
          responses={responses}
          isLoading={isLoadingRsvp}
        />
      </main>

      <SiteFooter brand={INVITATION_BRAND} />
      <MobileQuickNav navItems={NAV_ITEMS} activeSection={activeSection} onNavigate={navigateToSection} />
      <ToastMessage message={toast} />
    </div>
  );
}

export default App;
