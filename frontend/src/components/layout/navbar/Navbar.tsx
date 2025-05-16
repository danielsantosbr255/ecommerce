"use client";

import MobileMenu from "../MobileMenu";
import MobileBar from "./MobileBar";
import DesktopBar from "./DesktopBar";
import { useState, useEffect, JSX } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar(): JSX.Element | null {
  const { user, userLoading } = useAuth();
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
    <nav className="bg-navbar flex flex-1 border-b border-lines/50 !text-primary items-center w-full">
      <main className="flex w-full lg:mx-auto lg:max-w-10/12">
        <DesktopBar user={user} loading={userLoading} />
        <MobileBar user={user} loading={userLoading} toggleMobileMenu={toggleMobileMenu} />

        {isMobileMenuOpen && <MobileMenu onClose={toggleMobileMenu} />}
      </main>
    </nav>
  );
}
