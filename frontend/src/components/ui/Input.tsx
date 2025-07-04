"use client";

import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  type?: string;
  icon?: React.ReactNode;
  className?: string;
}

const Input = ({ id, label, type = "text", icon, className, ...props }: InputProps) => {
  const [inputType, setPasswordType] = useState(type);

  const togglePassword = () => {
    setPasswordType(inputType === "password" ? "text" : "password");
  };

  return (
    <div
      className={`relative flex border-2 border-lines rounded-lg gap-2 focus-within:border-primary items-center px-3 py-3 ${className}`}
    >
      {icon}
      <input
        type={inputType}
        id={id}
        className={`bg-bg-secondary block w-full appearance-none focus:outline-none focus:ring-0 peer placeholder-tx-muted/50`}
        {...props}
      />
      <label
        htmlFor={id}
        className="bg-bg-secondary absolute text-sm text-tx-muted top-0 -translate-y-1/2 z-5 px-1 peer-focus:text-primary transition-all duration-300"
      >
        {label}
      </label>

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
