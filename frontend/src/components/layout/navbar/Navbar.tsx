import { JSX } from "react";
import Topbar from "./Topbar";
import { cn } from "@/lib/utils";
import DesktopBar from "./DesktopBar";
import SectionsBar from "./SectionsBar";

export default function Navbar({ scrolled = false }: { scrolled?: boolean }): JSX.Element | null {
  const DELAY = 500;

  return (
    <main
      className={cn(
        `bg-bg-primary border backdrop-blur-lg border-lines/50 transition-all duration-${DELAY} ease-in-out overflow-hidden`,
        scrolled
          ? "bg-bg-secondary/90 w-full max-w-10/12 mx-auto shadow-xs rounded-lg"
          : "w-full max-w-screen border-t-transparent border-x-transparent"
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
          `mx-auto text-primary flex items-center justify-center w-full transition-all duration-${DELAY} ease-in-out overflow-hidden`,
          scrolled ? "max-w-full" : "max-w-10/12"
        )}
      />

      <SectionsBar
        className={`transition-all duration-${DELAY} ease-initial overflow-hidden ${
          scrolled ? "max-h-0 opacity-0" : "max-h-[400px] opacity-100"
        }`}
      />
    </main>
  );
}
