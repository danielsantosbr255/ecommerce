import React from "react";
import Navbar from "./Navbar";
import { AudioLines } from "lucide-react";

export default function Header() {
  return (
    <header className="flex flex-col w-full z-50 bg-navbar shadow-xs h-auto border-b border-lines lg:h-25">
      <Navbar />

      <section className="bg-amber-500 flex mb-2 w-full justify-center items-center">
        <div className="flex w-full py-1 text-tx-on-primary text-xs md:text-sm justify-around items-center md:font-medium md:max-w-4/5 mx-auto">
          <span className="flex uppercase justify-center w-full items-center">
            Categoria
          </span>
          <span className="flex uppercase justify-center w-full items-center">
            Produtos
          </span>
          <span className="flex uppercase justify-center w-full items-center">
            Frete Grátis
          </span>
          <span className="flex uppercase justify-center w-full items-center">
            Hardware
          </span>
          <span className="flex uppercase justify-center w-full items-center">
            Software
          </span>
          <span className="flex uppercase justify-center w-full items-center">
            Outros
          </span>
        </div>
      </section>
    </header>
  );
}
