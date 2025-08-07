"use client";

import { useState } from "react";
import { FieldError } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FiAlertCircle } from "react-icons/fi";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  error?: FieldError;
}

const Input = ({ label, icon, error, className, type, ...props }: InputProps) => {
  const [inputType, setInputType] = useState(type || "text");

  const togglePassword = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className="flex flex-col gap-1">
      <div className={`relative flex items-center transition-colors ${className}`}>
        <span className="ml-3 absolute left-0 top-1/2 transform -translate-y-1/2">{icon}</span>

        <label
          htmlFor={props.id}
          className="bg-bg-secondary absolute text-sm font-medium peer-focus:text-primary text-tx-secondary/80 top-0 -translate-y-1/2 z-5 px-1 ml-3 leading-none transition-all"
        >
          {label}
        </label>

        <input
          id={props.id}
          type={inputType}
          {...props}
          className={`peer flex flex-1 p-2.5 rounded-md ring-2 ring-lines outline-lines focus:outline-primary transition-colors
          ${icon && "pl-10"} placeholder-tx-muted/50 bg-transparent autofill:bg-transparent`}
        />

        {type === "password" && (
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-tx-muted hover:text-primary transition-colors duration-300 cursor-pointer"
            onClick={togglePassword}
          >
            {inputType === "password" ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
          </button>
        )}
      </div>

      {error && (
        <span className={`text-tx-error flex items-center text-sm gap-1 ${className}`}>
          <FiAlertCircle size={16} /> {error.message}
        </span>
      )}
    </div>
  );
};

export default Input;
