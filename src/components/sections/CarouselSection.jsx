import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fadeInUp } from "../../constants/motion";
import { CAROUSEL_IMAGES } from "../../constants/invitationData";

function getNextIndex(currentIndex, listLength) {
  return currentIndex === listLength - 1 ? 0 : currentIndex + 1;
}

function getPreviousIndex(currentIndex, listLength) {
  return currentIndex === 0 ? listLength - 1 : currentIndex - 1;
}

function CarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const carouselRootRef = useRef(null);
  const imageCount = CAROUSEL_IMAGES.length;
  const activeSlide = CAROUSEL_IMAGES[currentIndex];
  const autoplayEnabled = !isPaused && !shouldReduceMotion && imageCount > 1;

  const goToNext = () => {
    setCurrentIndex((prevIndex) => getNextIndex(prevIndex, imageCount));
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => getPreviousIndex(prevIndex, imageCount));
  };

  useEffect(() => {
    if (!autoplayEnabled) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setCurrentIndex((prevIndex) => getNextIndex(prevIndex, imageCount));
    }, 4200);

    return () => window.clearInterval(timer);
  }, [autoplayEnabled, imageCount]);

  useEffect(() => {
    if (imageCount <= 1) {
      return;
    }

    const nextImage = new Image();
    nextImage.src = CAROUSEL_IMAGES[getNextIndex(currentIndex, imageCount)].src;
  }, [currentIndex, imageCount]);

  const handleKeyNavigation = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToNext();
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToPrevious();
    }
  };

  const handleFocusLeave = (event) => {
    if (!carouselRootRef.current?.contains(event.relatedTarget)) {
      setIsPaused(false);
    }
  };

  const slideTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.7, ease: "easeInOut" };

  const captionTransition = shouldReduceMotion
    ? { duration: 0 }
    : { delay: 0.2, duration: 0.45 };

  return (
    <section className="space-y-6" aria-label="Our love story">
      <motion.h2 {...fadeInUp} className="section-title text-center">
        Our Love Story
      </motion.h2>

      <div
        ref={carouselRootRef}
        className="relative mx-auto max-w-4xl space-y-4 outline-none"
        tabIndex={0}
        onKeyDown={handleKeyNavigation}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={handleFocusLeave}
      >
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {`Slide ${currentIndex + 1} of ${imageCount}: ${activeSlide.caption}`}
        </p>

        <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl">
          <AnimatePresence initial={false} mode="wait">
            <motion.figure
              key={activeSlide.src}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={slideTransition}
              className="absolute inset-0"
            >
              <img
                src={activeSlide.src}
                alt={activeSlide.alt}
                width={activeSlide.width}
                height={activeSlide.height}
                className="w-full h-full object-cover"
                loading={currentIndex === 0 ? "eager" : "lazy"}
                fetchPriority={currentIndex === 0 ? "high" : "auto"}
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <motion.p
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={captionTransition}
                  className="text-lg md:text-xl font-medium text-center"
                >
                  {activeSlide.caption}
                </motion.p>
              </div>
            </motion.figure>
          </AnimatePresence>

          {imageCount > 1 ? (
            <>
              <button
                type="button"
                className="btn-secondary absolute left-3 top-1/2 -translate-y-1/2 px-3 py-2"
                onClick={goToPrevious}
                aria-label="Previous slide"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                className="btn-secondary absolute right-3 top-1/2 -translate-y-1/2 px-3 py-2"
                onClick={goToNext}
                aria-label="Next slide"
              >
                <ChevronRight size={16} />
              </button>
            </>
          ) : null}
        </div>

        {imageCount > 1 ? (
          <div className="flex items-center justify-center gap-2">
            {CAROUSEL_IMAGES.map((slide, index) => {
              const isActive = index === currentIndex;

              return (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-200 ${
                    isActive ? "w-6 bg-[var(--accent)]" : "w-2.5 bg-[var(--border)]"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={isActive ? "true" : undefined}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default CarouselSection;
