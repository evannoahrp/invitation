import { motion } from "framer-motion";
import { fadeInUp } from "../../constants/motion";

function GallerySection({ images }) {
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
            <img
              src={src}
              alt={`Moment ${index + 1}`}
              className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 md:h-80"
              loading="lazy"
            />
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

export default GallerySection;
