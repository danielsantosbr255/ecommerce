"use client";

import { cn } from "@/lib/utils";
import Topbar from "./navbar/Topbar";
import MobileBar from "./navbar/MobileBar";
import { useEffect, useState } from "react";
import DesktopBar from "./navbar/DesktopBar";
import SectionsBar from "./navbar/SectionsBar";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const DELAY = 500;

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) setScrolled(true);
      else setScrolled(false);
    });
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 pb-5 flex justify-center transition-all duration-${DELAY} ease-in-out`}
    >
      <main
        className={cn(
          `bg-bg-secondary border shadow-xs p-1 transition-all duration-${DELAY} ease-in-out`,
          scrolled
            ? "bg-bg-secondary/80 backdrop-blur-xl w-full mt-2 lg:max-w-10/12 mx-auto  rounded-lg border-lines/50"
            : "w-full max-w-screen border-t-transparent border-transparent"
        )}
      >
        <Topbar
          className={cn(
            `flex flex-col gap-2 mx-auto items-center justify-center overflow-hidden transition-all duration-${DELAY} ease-in-out`,
            scrolled ? "max-h-0 w-0 opacity-0" : "max-h-32 w-full opacity-100"
          )}
        />

        <DesktopBar
          className={cn(
            `mx-auto text-primary flex items-center justify-center w-full transition-all duration-${DELAY} ease-in-out`,
            scrolled ? "max-w-full" : "max-w-10/12"
          )}
        />

        <MobileBar />

        <SectionsBar
          className={`transition-all duration-${DELAY} ease-initial ${
            scrolled ? "max-h-0 opacity-0" : "max-h-[400px] opacity-100"
          }`}
        />
      </main>
    </header>
  );
}
