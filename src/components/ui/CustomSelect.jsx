import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

function clampIndex(nextIndex, listLength) {
  if (nextIndex < 0) return listLength - 1;
  if (nextIndex >= listLength) return 0;
  return nextIndex;
}

function CustomSelect({
  label,
  value,
  options,
  placeholder,
  onChange
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const rootRef = useRef(null);
  const optionRefs = useRef([]);
  const labelId = useId();
  const listboxId = useId();
  const valueId = useId();

  useOnClickOutside(rootRef, () => setIsOpen(false));

  useEffect(() => {
    const selectedIndex = options.indexOf(value);
    setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [options, value]);

  useEffect(() => {
    if (!isOpen) return;
    optionRefs.current[focusedIndex]?.focus();
  }, [focusedIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [isOpen]);

  const handleKeyNavigation = useCallback(
    (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setFocusedIndex((prev) => clampIndex(prev + 1, options.length));
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setFocusedIndex((prev) => clampIndex(prev - 1, options.length));
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const selectedOption = options[focusedIndex];
        if (selectedOption) {
          onChange(selectedOption);
          setIsOpen(false);
        }
      }
    },
    [focusedIndex, onChange, options]
  );

  const handleTriggerKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen((prev) => !prev);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
      setFocusedIndex((prev) => clampIndex(prev + 1, options.length));
    }
  };

  return (
    <div className="field">
      <span id={labelId}>{label}</span>
      <div className="custom-dropdown" ref={rootRef}>
        <button
          type="button"
          className={`input dropdown-trigger ${value ? "" : "is-placeholder"}`}
          onClick={() => setIsOpen((prev) => !prev)}
          onKeyDown={handleTriggerKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={`${labelId} ${valueId}`}
          aria-controls={listboxId}
        >
          <span id={valueId}>{value || placeholder}</span>
          <motion.span
            className="select-icon-wrap"
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0, y: isOpen ? -1 : 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 360, damping: 26, mass: 0.65 }
            }
          >
            <ChevronDown size={16} className="select-icon" aria-hidden="true" />
          </motion.span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.15, ease: "easeOut" }}
              className="dropdown-menu"
              id={listboxId}
              role="listbox"
              aria-labelledby={labelId}
              onKeyDown={handleKeyNavigation}
            >
              {options.map((option, index) => {
                const isSelected = value === option;

                return (
                  <button
                    key={option}
                    type="button"
                    id={`${listboxId}-option-${index}`}
                    role="option"
                    aria-selected={isSelected}
                    ref={(node) => {
                      optionRefs.current[index] = node;
                    }}
                    className={`dropdown-item ${isSelected ? "is-selected" : ""}`}
                    onMouseEnter={() => setFocusedIndex(index)}
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                    }}
                  >
                    <span>{option}</span>
                    {isSelected ? <Check size={14} /> : null}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CustomSelect;
