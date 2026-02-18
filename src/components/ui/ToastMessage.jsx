import { motion, AnimatePresence } from "framer-motion";

function ToastMessage({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-20 left-4 right-4 z-50 md:bottom-5 md:left-1/2 md:-translate-x-1/2 md:w-auto rounded-full bg-[var(--text)] px-5 py-2 text-sm text-white shadow-lg text-center"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ToastMessage;
