import React from "react";
import Link from "next/link";
import { BsFire } from "react-icons/bs";
import { Ubuntu as Monoton } from "next/font/google";

const monoton = Monoton({ weight: "500", subsets: ["latin"] });

interface LogoProps {
  className?: string;
  size?: number;
  name?: boolean;
  variant?: keyof typeof variants;
}

const variants = {
  default: "text-primary",
  secondary: "text-primary",
  light: "text-tx-on-primary",
  dark: "text-primary",
  animated: `scale-120 animate-pulse text-primary`,
};

export default function Logo({ className, size, variant = "default" }: LogoProps) {
  if (variant === "animated") {
    return (
      <Link href="/">
        <div className={`${className} relative flex items-center justify-center animate-flicker`}>
          <BsFire className="absolute" size={size} />
          <BsFire className={variants[variant]} size={size} />
        </div>
      </Link>
    );
  }

  return (
    <main className={`${monoton.className} flex w-full h-full items-center text-primary ${className}`}>
      <Link
        href="/"
        className={`relative flex h-15 md:text-2xl items-center scale-98 hover:scale-100 transition-all duration-300  ${className}`}
      >
        <span className="flex gap-1 truncate">
          <BsFire className={`shrink-0 ${variants[variant]}`} size={size} />
          <span className="from-primary to-red-500 bg-clip-text bg-gradient-to-r text-transparent">Fireforge Labs</span>
        </span>
      </Link>
    </main>
  );
}
