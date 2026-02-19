import { motion } from "framer-motion";
import { fadeInUp } from "../../constants/motion";

function GallerySection({ images }) {
  return (
    <section id="gallery" className="space-y-6">
      <motion.h2 {...fadeInUp} className="section-title">
        Moments Gallery
      </motion.h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((src, index) => (
          <motion.figure
            key={src}
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: index * 0.05 }}
            className="group overflow-hidden rounded-3xl"
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
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

export default GallerySection;
