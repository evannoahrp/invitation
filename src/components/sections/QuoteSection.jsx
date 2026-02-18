import { motion } from "framer-motion";
import { fadeInUp } from "../../constants/motion";

function QuoteSection() {
  return (
    <section className="space-y-6 text-center">
      <motion.blockquote {...fadeInUp} className="mx-auto max-w-2xl text-lg italic text-(--text) leading-relaxed">
        "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres."
      </motion.blockquote>
      <motion.cite {...fadeInUp} className="block text-sm text-(--text-soft)">
        — 1 Corinthians 13:4–7
      </motion.cite>
    </section>
  );
}

export default QuoteSection;