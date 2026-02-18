import { motion } from "framer-motion";

function ProgressBar({ value }) {
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: value / 100 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="h-full origin-left bg-(--accent)"
      />
    </div>
  );
}

export default ProgressBar;
