import React from "react";
import Navbar from "./Navbar";
import { AudioLines } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed flex flex-col w-full top-0 z-50 bg-navbar shadow-md h-auto lg:h-20">
      <section className="flex justify-between h-1/3 w-full text-[10px] lg:text-sm text-secondary border-b  border-gray-100">
        <main className="grid grid-cols-3 items-center justify-between w-full px-1 lg:px-4 py-0 lg:py-0 lg:max-w-10/12 mx-auto">
          {/* Logo and Title */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">
              <AudioLines size={15} />
            </span>
          </div>

          <div className="flex justify-center items-center font-semibold">[WIP] Demo Store</div>

          <div className="flex gap-4 justify-end items-center">
            <div className="flex gap-3">
              <select name="languages" className="focus:outline-none">
                <option value="pt-BR">PT-BR</option>
                <option value="en-US">EN-US</option>
              </select>

              <select name="currency" className="focus:outline-none">
                <option value="BRL">BRL</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>
        </main>
      </section>
      <Navbar />
    </header>
  );
}
