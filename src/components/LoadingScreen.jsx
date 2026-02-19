import { motion, useReducedMotion } from "framer-motion";
import { WEDDING_DATE_LABEL } from "../constants/invitationData";

function LoadingScreen({ onReady }) {
  const shouldReduceMotion = useReducedMotion();
  const introTransition = shouldReduceMotion ? { duration: 0 } : { duration: 0.5 };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg)]"
    >
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={introTransition}
        className="text-center space-y-8"
      >
        {/* Logo/Brand Section */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading text-(--text)">
            Evan & Fila
          </h1>
          <p className="text-sm mt-2 text-(--text-soft) tracking-wider">
            Wedding Invitation
          </p>
        </motion.div>

        {/* Main Image/Quote Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.4, duration: 0.8 }}
          className="space-y-4"
        >
          <p className="text-sm md:text-base italic text-(--text) max-w-xs mx-auto leading-relaxed">
            "Love is patient, love is kind"
          </p>
          <p className="text-xs text-(--text-soft)">
            {WEDDING_DATE_LABEL}
          </p>
        </motion.div>

        {/* Call to Action Button */}
        <motion.button
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.6, duration: 0.5 }}
          onClick={onReady}
          className="btn-primary mx-auto"
        >
          Tap to Open
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default LoadingScreen;
