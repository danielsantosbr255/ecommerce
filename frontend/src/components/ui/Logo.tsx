import React from "react";
import Link from "next/link";
import { BsFire } from "react-icons/bs";
import { Ubuntu as Monoton } from "next/font/google";
// import { GiFlame } from "react-icons/gi";

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
        <div className={`${className} relative flex items-center justify-center animate-bounce`}>
          <BsFire className="absolute" size={size} />
          <BsFire className={variants[variant]} size={size} />
        </div>
      </Link>
    );
  }

  return (
    <main className={`${monoton.className} flex w-full h-full items-center text-primary ${className}`}>
      <Link href="/" className="relative flex h-15 md:text-2xl items-center hover:scale-105 transition-all duration-300">
        <span className="flex gap-1">
          <BsFire className={variants[variant]} size={size} /> Fireforge Labs
        </span>
      </Link>
    </main>
  );
}

{
  /* <Image
        src="https://res.cloudinary.com/drhdpmlzh/image/upload/v1746193772/fireforge-labs-width-logo_vlqm3a.png"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
        priority
        alt="Fireforge Labs"
        className="object-contain"
      /> */
}

{
  /* <BsFire className={variants[variant]} size={size} />
  {name && <span className="text-tx-on-primary truncate">Fireforge Labs</span>} */
}
