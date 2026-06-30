import { motion } from "framer-motion";
import { fadeInUp } from "../../constants/motion";

function QuoteSection() {
  return (
    <section className="space-y-6 text-center">
      <motion.blockquote
        {...fadeInUp}
        className="mx-auto max-w-2xl text-lg italic text-(--text) leading-relaxed"
      >
        It all began with an unexpected meeting at a gathering with our friends.
        What seemed like an ordinary moment became the start of something truly
        special.
      </motion.blockquote>
      <motion.blockquote
        {...fadeInUp}
        className="mx-auto max-w-2xl text-lg italic text-(--text) leading-relaxed"
      >
        Life later took us to different cities, and distance became part of our
        journey. Yet through every mile, our love only grew stronger. When life
        finally brought us closer again, we knew we were always meant to find
        our way back to each other. Now, with
      </motion.blockquote>
      <motion.blockquote
        {...fadeInUp}
        className="mx-auto max-w-2xl text-lg italic text-(--text) leading-relaxed"
      >
        grateful hearts, we begin our greatest adventure—forever together.
      </motion.blockquote>
    </section>
  );
}

export default QuoteSection;
