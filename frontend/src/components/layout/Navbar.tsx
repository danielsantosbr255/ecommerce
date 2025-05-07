"use client";

import MobileMenu from "./MobileMenu";
import MobileBar from "./navbar/MobileBar";
import DesktopBar from "./navbar/DesktopBar";
import { useState, useEffect, JSX } from "react";
import { User } from "@/types";

export default function Navbar({ user }: { user: User | null }): JSX.Element | null {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <nav className="flex flex-1 !text-tx-on-primary items-center w-full lg:mx-auto lg:max-w-10/12">
      <DesktopBar user={user} />
      <MobileBar user={user} toggleMobileMenu={toggleMobileMenu} />

      {isMobileMenuOpen && <MobileMenu onClose={toggleMobileMenu} />}
    </nav>
  );
}
