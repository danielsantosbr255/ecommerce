import { cn } from "@/lib/utils/utils";
import Link from "next/link";
import React from "react";

interface ButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  href?: string;
}

const variants = {
  primary: "bg-primary text-tx-on-primary",
  default: "bg-primary text-tx-on-primary",
  secondary: "bg-white text-primary border border-primary",
  light: "bg-white text-primary border border-primary",
  dark: "bg-primary text-tx-on-primary border border-primary",
  animated: `animate-pulse text-primary-hover/20`,
  danger: "bg-red-500 text-tx-on-primary",
  success: "bg-green-500 text-tx-on-primary",
  warning: "bg-yellow-500 text-tx-on-primary",
  info: "bg-blue-500 text-tx-on-primary",
  muted: "bg-gray-500 text-tx-on-primary",
  outline: "bg-transparent text-primary border border-primary hover:bg-white hover:text-primary",
  link: "bg-transparent text-primary hover:bg-primary hover:text-tx-on-primary",
};

export default function Button({ className, href, variant = "default", ...props }: ButtonProps) {
  if (href) {
    return (
      <Link href={href}>
        <button
          className={cn(
            className,
            variants[variant],
            "rounded-md flex justify-center items-center py-2 px-3 shadow-xs cursor-pointer",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "hover:opacity-90 transition-all truncate"
          )}
          {...props}
        />
      </Link>
    );
  }

  return (
    <button
      className={cn(
        className,
        variants[variant],
        "rounded-md flex justify-center items-center py-2 px-3 shadow-xs cursor-pointer",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "hover:opacity-90"
      )}
      {...props}
    />
  );
}
