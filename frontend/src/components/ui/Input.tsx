"use client";

import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  type?: string;
  icon?: React.ReactNode;
  className?: string;
}

const Input = ({ label, type = "text", icon, className, ...props }: InputProps) => {
  const [inputType, setPasswordType] = useState(type);

  const togglePassword = () => {
    setPasswordType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className={`relative flex items-center transition-colors ${className}`}>
      <span className="ml-3 absolute left-0 top-1/2 transform -translate-y-1/2">{icon}</span>

      <label className="bg-bg-secondary absolute text-sm font-semibold peer-focus:text-primary text-tx-secondary top-0 -translate-y-1/2 z-5 px-1 ml-3 leading-none transition-all">
        {label}
      </label>

      <input
        type={inputType}
        {...props}
        className={`peer w-full p-3 rounded-lg ring-2 ring-lines outline-lines focus:outline-primary transition-colors
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
  );
};

export default Input;
