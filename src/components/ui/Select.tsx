import React, { useState, useRef, useEffect } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  className = "",
  size = "md",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const ChevronIcon = ({ isUp }: { isUp: boolean }) => (
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${
        isUp ? "rotate-180" : ""
      }`}
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M19 9l-7 7-7-7'
      />
    </svg>
  );

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      <button
        type='button'
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full border border-gray-200 rounded-lg bg-white text-left
          transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-mint focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-between
          ${sizes[size]}
          ${isOpen ? "border-brand-mint" : ""}
        `}
      >
        <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronIcon isUp={isOpen} />
      </button>

      {isOpen && (
        <div className='absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto'>
          {options.map((option) => (
            <button
              key={option.value}
              type='button'
              onClick={() => handleSelect(option.value)}
              className={`
                w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-150
                ${
                  value === option.value
                    ? "bg-brand-mint bg-opacity-10 text-brand-purple"
                    : "text-gray-900"
                }
                first:rounded-t-lg last:rounded-b-lg
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
