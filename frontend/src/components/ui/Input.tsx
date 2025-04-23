import React from "react";

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`bg-gray-100 text-sm p-2 rounded-lg border border-gray-200 focus:outline-highlight-n ${className}`}
      {...props}
    />
  );
}
