import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeInUp } from "../../constants/motion";

function GallerySection({ images }) {
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (!activeImage) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeImage]);

  return (
    <section id="gallery" className="space-y-6">
      <motion.h2 {...fadeInUp} className="section-title section-heading-accent">
        Moments Gallery
      </motion.h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((src, index) => (
          <motion.figure
            key={src}
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: index * 0.05 }}
            className="group gallery-frame overflow-hidden rounded-3xl"
          >
            <button
              type="button"
              onClick={() => setActiveImage({ src, alt: `Moment ${index + 1}` })}
              className="block w-full cursor-zoom-in"
              aria-label={`Open preview for moment ${index + 1}`}
            >
              <img
                src={src}
                alt={`Moment ${index + 1}`}
                width="1200"
                height="800"
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 md:h-80"
                loading="lazy"
                decoding="async"
              />
            </button>
          </motion.figure>
        ))}
      </div>

      <AnimatePresence>
        {activeImage ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
            onClick={() => setActiveImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-5xl"
            >
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                className="absolute right-3 top-3 z-10 rounded-full bg-black/65 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-black/80"
                aria-label="Close preview"
              >
                Close
              </button>
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                width="1600"
                height="1067"
                className="max-h-[85vh] w-full rounded-2xl object-contain shadow-2xl"
                decoding="async"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

export default GallerySection;
