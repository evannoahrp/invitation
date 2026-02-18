import { useCallback, useEffect, useRef, useState } from "react";
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
  const rootRef = useRef(null);
  const optionRefs = useRef([]);

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
      {label}
      <div className="custom-dropdown" ref={rootRef}>
        <button
          type="button"
          className={`input dropdown-trigger ${value ? "" : "is-placeholder"}`}
          onClick={() => setIsOpen((prev) => !prev)}
          onKeyDown={handleTriggerKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span>{value || placeholder}</span>
          <ChevronDown size={16} className={`select-icon ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div
            className="dropdown-menu"
            role="listbox"
            aria-label={label}
            onKeyDown={handleKeyNavigation}
          >
            {options.map((option, index) => {
              const isSelected = value === option;

              return (
                <button
                  key={option}
                  type="button"
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
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomSelect;
