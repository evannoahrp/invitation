import { motion } from "framer-motion";
import { Heart, Send } from "lucide-react";
import { fadeInUp } from "../../constants/motion";
import CustomSelect from "../ui/CustomSelect";

const MESSAGE_LIMIT = 240;

function RsvpSection({
  form,
  attendanceOptions,
  onFieldChange,
  onAttendanceChange,
  onSubmit,
  responses,
  isLoading
}) {
  const remainingCharacters = MESSAGE_LIMIT - form.message.length;

  const formatTimestamp = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
  };

  return (
    <section id="rsvp" className="space-y-6 pb-10">
      <motion.h2 {...fadeInUp} className="section-title section-heading-accent">
        RSVP & Wishes
      </motion.h2>

      <div className="grid gap-5 md:grid-cols-[1.1fr_0.9fr]">
        <motion.form {...fadeInUp} onSubmit={onSubmit} className="glass-card section-frame space-y-4 p-6 md:p-8">
          <label className="field">
            Name
            <input
              className="input"
              placeholder="Full name"
              value={form.name}
              onChange={(event) => onFieldChange("name", event.target.value)}
            />
          </label>

          <CustomSelect
            label="Attendance Confirmation"
            value={form.attendance}
            options={attendanceOptions}
            placeholder="Please select one"
            onChange={onAttendanceChange}
          />

          <label className="field">
            Message
            <textarea
              className="input min-h-28 resize-none"
              placeholder="Please share your kind wishes and prayers"
              maxLength={MESSAGE_LIMIT}
              value={form.message}
              onChange={(event) => onFieldChange("message", event.target.value)}
            />
            <span className="text-xs font-medium text-(--text-soft)">
              {remainingCharacters} characters remaining
            </span>
          </label>

          <button className="btn-primary w-full justify-center" type="submit">
            <Send size={16} />
            Submit RSVP
          </button>
        </motion.form>

        <motion.div {...fadeInUp} className="glass-card section-frame p-6 md:p-8">
          <h3 className="font-heading text-2xl">Latest Wishes</h3>
          <div className="mt-4 space-y-3">
            {isLoading ? (
              <p className="rsvp-entry rounded-2xl p-4 text-sm text-(--text-soft)">
                Loading RSVP entries...
              </p>
            ) : responses.length === 0 ? (
              <p className="rsvp-entry rounded-2xl p-4 text-sm text-(--text-soft)">
                No messages have been submitted yet. Be the first to share your warm wishes.
              </p>
            ) : (
              responses.slice(0, 5).map((item) => (
                <article key={item.id} className="rsvp-entry rounded-2xl p-4">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <p className="font-semibold">{item.name}</p>
                    <span className="chip text-[10px]">
                      <Heart size={12} /> {item.attendance}
                    </span>
                  </div>
                  <p className="text-xs text-(--text-soft)">{formatTimestamp(item.createdAt)}</p>
                  <p className="mt-2 text-sm text-(--text-soft)">
                    {item.message || "Thank you for this gracious invitation."}
                  </p>
                </article>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default RsvpSection;
