// components/ui/Button.tsx

import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "ghost" | "outline" | "secondary";
};

export function Button({ className, variant = "default", ...props }: Props) {
    const base =
        variant === "ghost"
            ? "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100"
            : "bg-amber-500 text-white hover:bg-amber-600";

    return (
        <button
            className={clsx(
                "px-6 py-2 rounded text-sm font-semibold transition-all",
                base,
                className
            )}
            {...props}
        />
    );
}
