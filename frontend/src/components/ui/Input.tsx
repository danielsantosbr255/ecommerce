import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: InputProps) {
    return (
        <input
            className={`bg-gray-100 p-5 rounded-lg border border-gray-200 focus:outline-amber-500 ${className}`}
            {...props}
        />
    );
}
