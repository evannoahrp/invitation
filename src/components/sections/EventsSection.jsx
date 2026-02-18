import { motion } from "framer-motion";
import { CalendarDays, Clock3, MapPin } from "lucide-react";
import { fadeInUp } from "../../constants/motion";

function EventsSection({ events }) {
  return (
    <section id="events" className="space-y-6">
      <motion.h2 {...fadeInUp} className="section-title">
        Event Details
      </motion.h2>

      <div className="grid gap-5 md:grid-cols-2">
        {events.map((event, index) => (
          <motion.article
            key={event.title}
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: index * 0.08 }}
            className="glass-card space-y-3 p-6"
          >
            <h3 className="font-heading text-2xl">{event.title}</h3>
            <p className="row-detail">
              <CalendarDays size={16} /> {event.date}
            </p>
            <p className="row-detail">
              <Clock3 size={16} /> {event.time}
            </p>
            <p className="row-detail">
              <MapPin size={16} /> {event.location}
            </p>
            <p className="text-[var(--text-soft)]">{event.address}</p>
            <a
              href={event.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary w-full justify-center"
            >
              <MapPin size={16} /> View on Google Maps
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default EventsSection;
