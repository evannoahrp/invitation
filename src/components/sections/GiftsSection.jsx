import { motion } from "framer-motion";
import { Check, Copy, Gift } from "lucide-react";
import { fadeInUp } from "../../constants/motion";

function GiftsSection({ accounts, copiedKey, onCopy }) {
  return (
    <section className="space-y-6">
      <motion.h2 {...fadeInUp} className="section-title">
        Wedding Blessings
      </motion.h2>

      <motion.p
        {...fadeInUp}
        transition={{ ...fadeInUp.transition, delay: 0.1 }}
        className="max-w-2xl text-center mx-auto text-[var(--text-soft)] mb-6"
      >
        Your presence at our celebration is the greatest gift, yet if you desire to bestow a blessing...
      </motion.p>

      <div className="grid gap-4 md:grid-cols-2">
        {accounts.map((item) => {
          const key = `${item.bank}-${item.number}`;
          const isCopied = copiedKey === key;

          return (
            <motion.article key={key} {...fadeInUp} className="glass-card space-y-4 p-6">
              <p className="chip inline-flex">
                <Gift size={14} /> {item.bank}
              </p>
              <div>
                <p className="font-heading text-2xl">{item.number}</p>
                <p className="text-sm text-[var(--text-soft)]">Account Name: {item.name}</p>
              </div>
              <button
                className="btn-secondary w-full justify-center"
                onClick={() => onCopy(item.number, key)}
                type="button"
              >
                {isCopied ? <Check size={16} /> : <Copy size={16} />}
                {isCopied ? "Copied" : "Copy Account Number"}
              </button>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

export default GiftsSection;
