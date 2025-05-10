import { FlameKindling } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Exo_2 as Monoton } from "next/font/google";
// import Image from "next/image";

const monoton = Monoton({ weight: "500", subsets: ["latin"] });

interface LogoProps {
  className?: string;
  size?: number;
  name?: boolean;
  variant?: keyof typeof variants;
}

const variants = {
  default: "text-tx-on-primary",
  secondary: "text-primary",
  light: "text-tx-on-primary",
  dark: "text-tx-primary",
  animated: `scale-120 animate-pulse text-primary-hover/20`,
};

export default function Logo({ className, size, variant = "default" }: LogoProps) {
  if (variant === "animated") {
    return (
      <Link href="/">
        <div className="relative flex items-center justify-center animate-bounce">
          <FlameKindling className="absolute" size={size} />
          <FlameKindling className={variants[variant]} size={size} />
        </div>
      </Link>
    );
  }
  {
    /* <FlameKindling className={variants[variant]} size={size} />
  {name && <span className="text-tx-on-primary truncate">Fireforge Labs</span>} */
  }

  return (
    <main className={`${monoton.className} flex w-full h-full items-center ${className}`}>
      <Link href="/" className="relative flex w-full h-18 md:text-2xl items-center">
        <FlameKindling className={variants[variant]} size={size} /> Fireforge Labs
        {/* <Image
          src="https://res.cloudinary.com/drhdpmlzh/image/upload/v1746193772/fireforge-labs-width-logo_vlqm3a.png"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
          priority
          alt="Fireforge Labs"
          className="object-contain"
        /> */}
      </Link>
    </main>
  );
}
