import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export default function Button({ children, ...rest }: ButtonProps) {
    return (
        <button
            {...rest}
            className="bg-highlight-n shadow-sm flex justify-center items-center gap-4 text-white p-3 rounded-lg text-xl cursor-pointer"
        >
            {children}
        </button>
    );
}
