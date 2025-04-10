// components/ui/Input.tsx

import { InputHTMLAttributes } from "react";
import clsx from "clsx";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: Props) {
    return (
        <input
            className={clsx(
                "w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500",
                className
            )}
            {...props}
        />
    );
}
