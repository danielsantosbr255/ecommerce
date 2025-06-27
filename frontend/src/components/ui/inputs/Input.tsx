import React from "react";

interface InputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
  label?: string;
  id?: string;
}

export default function Input({ className, label, id, ...props }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-tx-primary text-sm font-bold mb-2">
        {label}
      </label>
      <input
        className={`bg-gray-100 w-full text-sm p-2 rounded-lg border border-lines focus:outline-primary ${className}`}
        {...props}
      />
    </div>
  );
}
