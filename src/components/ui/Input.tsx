import React from "react";

interface InputProps {
  type?: "text" | "email" | "password" | "number" | "search";
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  size?: "sm" | "md" | "lg";
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  className = "",
  icon,
  iconPosition = "left",
  size = "md",
}) => {
  const baseStyles =
    "w-full border border-gray-200 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-mint focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed bg-white";

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  if (icon) {
    return (
      <div className={`relative ${className}`}>
        {iconPosition === "left" && (
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <span className={`${iconSizes[size]} text-gray-400`}>{icon}</span>
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          className={`${baseStyles} ${sizes[size]} ${
            iconPosition === "left" ? "pl-10" : "pr-10"
          }`}
        />
        {iconPosition === "right" && (
          <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
            <span className={`${iconSizes[size]} text-gray-400`}>{icon}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      className={`${baseStyles} ${sizes[size]} ${className}`}
    />
  );
};
