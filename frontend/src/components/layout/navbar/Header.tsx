"use client";

import Topbar from "./Topbar";
import MobileBar from "./MobileBar";
import DesktopBar from "./DesktopBar";
import { cn } from "@/lib/utils/utils";
import SectionsBar from "./SectionsBar";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";

const DELAY = 500;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) setScrolled(true);
      else setScrolled(false);
    });
  }, []);

  return (
    <header
      className={cn(
        `fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-${DELAY} ease-in-out`,
        scrolled && "px-1"
      )}
    >
      <main
        className={cn(
          `bg-bg-secondary border-2 border-lines/50 shadow-xs p-1 transition-all duration-${DELAY} ease-in-out`,
          scrolled
            ? "bg-bg-secondary/90 backdrop-blur-lg w-full mt-1 lg:max-w-10/12 mx-auto rounded-lg"
            : "w-full max-w-screen border-t-transparent border-transparent"
        )}
      >
        <Topbar
          className={cn(
            `flex flex-col gap-2 mx-auto items-center justify-center transition-all duration-${DELAY} ease-in-out`,
            scrolled ? "max-h-0 w-0 opacity-0" : "max-h-32 w-full opacity-100"
          )}
        />

        <DesktopBar
          className={cn(
            `mx-auto text-primary flex items-center justify-center w-full transition-all duration-${DELAY} ease-in-out`,
            scrolled ? "max-w-full" : "max-w-10/12"
          )}
        />

        <MobileBar toggleMobileMenu={toggleMobileMenu} />

        <SectionsBar
          className={`transition-all duration-${DELAY} ease-initial ${
            scrolled ? "max-h-0 opacity-0" : "max-h-[400px] opacity-100"
          }`}
        />
      </main>

      <MobileMenu onClose={toggleMobileMenu} isOpen={isMobileMenuOpen} />
    </header>
  );
}
