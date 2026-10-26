import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, Check } from "lucide-react";
import {
  COUNTRY_CALLING_CODES,
  getFlagEmoji,
} from "../utils/countryCodes";

export function CountryCodeCombobox({
  value = "+1",
  onChange,
  name = "countryCode",
  id = "countryCode",
  ariaLabelledBy,
  onSelectAdvance,
}) {
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  // Find the selected country object based on calling code (default to first/US)
  const selectedCountry = useMemo(() => {
    return (
      COUNTRY_CALLING_CODES.find((c) => c.code === value) ||
      COUNTRY_CALLING_CODES[0]
    );
  }, [value]);

  const [prevValue, setPrevValue] = useState(value);
  const [searchQuery, setSearchQuery] = useState(
    `${selectedCountry.code} (${selectedCountry.iso})`
  );
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // Sync searchQuery when value prop changes externally
  if (prevValue !== value) {
    setPrevValue(value);
    setSearchQuery(`${selectedCountry.code} (${selectedCountry.iso})`);
  }

  // Filter countries by query (matches country name, calling code with/without +, or ISO)
  const filteredCountries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return COUNTRY_CALLING_CODES;

    // If query matches the currently displayed format "+1 (US)", don't filter out everything
    if (q === `${selectedCountry.code} (${selectedCountry.iso})`.toLowerCase()) {
      return COUNTRY_CALLING_CODES;
    }

    const cleanQ = q.startsWith("+") ? q.slice(1) : q;
    return COUNTRY_CALLING_CODES.filter((c) => {
      const codeWithoutPlus = c.code.replace("+", "");
      return (
        c.country.toLowerCase().includes(q) ||
        c.iso.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        codeWithoutPlus.startsWith(cleanQ)
      );
    });
  }, [searchQuery, selectedCountry]);

  // Keep highlightedIndex safely within bounds
  const activeHighlightIndex = Math.min(
    highlightedIndex,
    Math.max(0, filteredCountries.length - 1)
  );

  // Scroll active item into view
  useEffect(() => {
    if (isOpen && listRef.current) {
      const activeItem = listRef.current.children[activeHighlightIndex];
      if (activeItem) {
        activeItem.scrollIntoView({ block: "nearest" });
      }
    }
  }, [activeHighlightIndex, isOpen]);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchQuery(`${selectedCountry.code} (${selectedCountry.iso})`);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, selectedCountry]);

  const handleSelect = (country) => {
    if (onChange) {
      onChange(country.code, country);
    }
    setSearchQuery(`${country.code} (${country.iso})`);
    setIsOpen(false);
    if (onSelectAdvance) {
      onSelectAdvance();
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    setHighlightedIndex(0);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    setHighlightedIndex(0);
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setHighlightedIndex(0);
      } else if (filteredCountries.length > 0) {
        setHighlightedIndex(
          (prev) => (prev + 1) % filteredCountries.length
        );
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setHighlightedIndex(filteredCountries.length - 1);
      } else if (filteredCountries.length > 0) {
        setHighlightedIndex(
          (prev) => (prev - 1 + filteredCountries.length) % filteredCountries.length
        );
      }
    } else if (e.key === "Enter") {
      if (isOpen && filteredCountries.length > 0 && filteredCountries[activeHighlightIndex]) {
        e.preventDefault();
        handleSelect(filteredCountries[activeHighlightIndex]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      setSearchQuery(`${selectedCountry.code} (${selectedCountry.iso})`);
    } else if (e.key === "Tab") {
      setIsOpen(false);
      setSearchQuery(`${selectedCountry.code} (${selectedCountry.iso})`);
    }
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOpen) {
      setIsOpen(false);
      setSearchQuery(`${selectedCountry.code} (${selectedCountry.iso})`);
    } else {
      setIsOpen(true);
      setHighlightedIndex(0);
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  };

  return (
    <div ref={containerRef} className="flanora-phone-combobox">
      {/* Hidden input to ensure native FormData includes countryCode */}
      <input type="hidden" name={name} value={value} />

      <div className="flanora-phone-combobox-input-wrap">
        <input
          ref={inputRef}
          id={id}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="flanora-country-code-list"
          aria-labelledby={ariaLabelledBy}
          aria-label="Search country calling code"
          autoComplete="off"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder="+1 (US)"
          className="flanora-phone-combobox-input"
        />
        <button
          type="button"
          tabIndex={-1}
          aria-label={isOpen ? "Close country list" : "Open country list"}
          className={`flanora-phone-combobox-arrow ${isOpen ? "is-open" : ""}`}
          onClick={toggleDropdown}
        >
          <ChevronDown size={13} aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <ul
          ref={listRef}
          id="flanora-country-code-list"
          role="listbox"
          aria-label="Country calling codes"
          className="flanora-country-dropdown-menu"
        >
          {filteredCountries.length === 0 ? (
            <li className="flanora-country-no-results">
              No country code found
            </li>
          ) : (
            filteredCountries.map((c, index) => {
              const isSelected = c.code === value && c.iso === selectedCountry.iso;
              const isHighlighted = index === activeHighlightIndex;

              return (
                <li
                  key={`${c.iso}-${c.code}`}
                  role="option"
                  aria-selected={isSelected}
                  className={`flanora-country-option ${
                    isHighlighted ? "is-highlighted" : ""
                  } ${isSelected ? "is-selected" : ""}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(c);
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <span className="flanora-country-flag" aria-hidden="true">
                    {getFlagEmoji(c.iso)}
                  </span>
                  <span className="flanora-country-name">{c.country}</span>
                  <span className="flanora-country-code">{c.code}</span>
                  {isSelected && (
                    <span className="flanora-country-check" aria-hidden="true">
                      <Check size={14} />
                    </span>
                  )}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
