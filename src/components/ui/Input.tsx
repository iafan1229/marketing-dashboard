// 🎨 src/components/ui/Input.tsx (표준 HTML 패턴)
import React from "react";

interface InputProps {
  type?: "text" | "email" | "password" | "number" | "search";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // 표준 패턴
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  size?: "sm" | "md" | "lg";
  id?: string; // 추가: label과 연결을 위해
  name?: string; // 추가: form 처리를 위해
  required?: boolean; // 추가: 필수 입력 필드
  autoComplete?: string; // 추가: 자동완성
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
  id,
  name,
  required = false,
  autoComplete,
}) => {
  const baseStyles =
    "w-full border border-gray-200 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white";

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
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange} // 표준 패턴: event 객체 그대로 전달
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
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
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange} // 표준 패턴: event 객체 그대로 전달
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      required={required}
      autoComplete={autoComplete}
      className={`${baseStyles} ${sizes[size]} ${className}`}
    />
  );
};
