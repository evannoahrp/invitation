import { motion } from "framer-motion";
import { CalendarDays, Send, Sparkles } from "lucide-react";
import { fadeInUp } from "../../constants/motion";
import { WEDDING_DATE_LABEL } from "../../constants/invitationData";
import { padNumber } from "../../utils/time";

function HeroSection({ brand, guestName, countdown, onNavigate }) {
  const countdownItems = [
    { label: "Days", value: countdown.days },
    { label: "Hours", value: countdown.hours },
    { label: "Minutes", value: countdown.minutes },
    { label: "Seconds", value: countdown.seconds }
  ];

  return (
    <section id="home" className="section-hero">
      <motion.div {...fadeInUp} className="relative space-y-6 rounded-3xl p-6 hero-frame md:p-8">
        <span className="chip">
          <Sparkles size={15} /> Wedding Invitation
        </span>
        <p className="text-sm tracking-[0.2em] uppercase text-(--text-soft)">
          To {guestName || "Our Honored Guest"}
        </p>
        <h1 className="font-heading text-5xl leading-tight md:text-7xl">{brand}</h1>
        <p className="max-w-2xl text-base text-(--text-soft) md:text-lg">
          With heartfelt joy, we invite you to be present and celebrate this meaningful wedding occasion with us.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="btn-primary" onClick={() => onNavigate("events")} type="button">
            <CalendarDays size={17} /> View Event Details
          </button>
          <button className="btn-secondary" onClick={() => onNavigate("rsvp")} type="button">
            <Send size={17} /> Confirm Attendance
          </button>
        </div>
      </motion.div>

      <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.1 }} className="glass-card p-6 md:p-8">
        <p className="mb-3 text-sm uppercase tracking-[0.18em] text-(--text-soft)">Saturday, July 4, 2026</p>

        {!countdown.ended ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {countdownItems.map((item) => (
              <div key={item.label} className="countdown-tile rounded-2xl p-4 text-center">
                <p className="font-heading text-3xl">{padNumber(item.value)}</p>
                <p className="text-xs tracking-wide uppercase text-(--text-soft)">{item.label}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="countdown-tile rounded-2xl p-5 text-center text-(--text-soft)">
            The ceremony is now in progress. We look forward to welcoming you at the venue.
          </div>
        )}
      </motion.div>
    </section>
  );
}

export default HeroSection;
