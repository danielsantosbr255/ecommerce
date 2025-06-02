import { JSX } from "react";
import DesktopBar from "./DesktopBar";
import MobileBar from "./MobileBar";

export default function Navbar(): JSX.Element | null {
  return (
    <nav className="bg-navbar flex flex-1 border-b border-lines/50 !text-primary items-center w-full">
      <main className="flex w-full lg:mx-auto lg:max-w-10/12">
        <DesktopBar />
        <MobileBar />
      </main>
    </nav>
  );
}
