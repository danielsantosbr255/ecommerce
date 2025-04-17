import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: InputProps) {
    return (
        <input
            className={`bg-gray-100 p-3 h-auto w-auto rounded-lg border border-gray-200 focus:outline-highlight-n ${className}`}
            {...props}
        />
    );
}
