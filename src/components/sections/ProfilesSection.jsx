import { motion } from "framer-motion";
import { fadeInUp } from "../../constants/motion";

function ProfilesSection({ profiles }) {
  return (
    <section id="profiles" className="space-y-6">
      <motion.h2 {...fadeInUp} className="section-title">
        Bride and Groom Profiles
      </motion.h2>

      <div className="grid gap-4 md:grid-cols-2">
        {profiles.map((person, index) => (
          <motion.article
            key={person.role}
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: index * 0.08 }}
            className="glass-card space-y-4 p-6 md:p-8"
          >
            <figure className="overflow-hidden rounded-3xl border border-[var(--border)]/80 bg-white/60">
              <img
                src={person.fullBodyPhoto}
                alt={`${person.role} full body portrait`}
                width="700"
                height="980"
                className="h-80 w-full object-cover md:h-[28rem]"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <p className="chip inline-flex">{person.role}</p>
            <h3 className="font-heading text-3xl">{person.nickname}</h3>
            <div className="space-y-2 text-[var(--text-soft)]">
              <p>{person.fullName}</p>
              <p>{person.childOrder}</p>
              <p>{person.parents}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default ProfilesSection;
