import { ChevronDown, Github, Instagram, Linkedin } from "lucide-react";
import Navbar from "./navbar/Navbar";
import Link from "next/link";
import StickyOnScroll from "./StickyOnScroll";

const HeaderItem = ({ label }: { label: string }) => {
  return (
    <div className="border border-lines/50 text-tx-secondary hover:text-tx-on-primary flex justify-between w-full items-center gap-2 p-1 px-2 rounded-md hover:bg-primary/80 transition duration-300 cursor-pointer">
      <span className="text-center flex items-center justify-center w-full font-medium">{label}</span>
      <ChevronDown className="hidden md:flex" />
    </div>
  );
};

export default function Header() {
  return (
    <header className="flex flex-col w-full z-50 bg-navbar px-2 h-auto">
      <section className="hidden lg:flex w-full justify-center border-b border-lines/20 items-center text-sm">
        <div className="grid grid-cols-3 w-full max-w-10/12 py-1 px-2 gap-2 items-center">
          <div className="flex text-tx-secondary justify-start items-center gap-2">
            <Link
              href="https://www.instagram.com/daniel_santosdev/"
              target="_blank"
              className="bg-gray-200 p-1 rounded-lg hover:text-primary transition duration-300"
            >
              <Instagram size={20} />{" "}
            </Link>
            <Link
              href="https://github.com/danielsantosbr255"
              target="_blank"
              className="bg-gray-200 p-1 rounded-lg hover:text-primary transition duration-300"
            >
              <Github size={20} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/daniel-santos-7826051b4/"
              target="_blank"
              className="bg-gray-200 p-1 rounded-lg hover:text-primary transition duration-300"
            >
              <Linkedin size={20} />
            </Link>
          </div>

          <div className="flex justify-center items-center">
            <h1 className="text-tx-secondary font-medium">PROJETO DE ESTUDO [WIP]</h1>
          </div>

          <div className="flex text-tx-secondary justify-end items-center">
            <select name="language" id="language">
              <option value="pt">PT-BR</option>
              <option value="en">EN-US</option>
            </select>

            <select name="currency" id="currency" className="ml-2">
              <option value="brl">BRL R$</option>
              <option value="usd">USD $</option>
            </select>
          </div>
        </div>
      </section>

      <StickyOnScroll offset={0}>
        <Navbar />
      </StickyOnScroll>

      <section className="flex w-full justify-center items-center">
        <div className="flex w-full pt-2 gap-2 text-tx-on-primary text-xs md:text-[16px] justify-around items-center md:font-medium md:max-w-4/5 mx-auto">
          <HeaderItem label="Categoria" />
          <HeaderItem label="Produtos" />
          <HeaderItem label="Frete Grátis" />
          <HeaderItem label="Hardware" />
          <HeaderItem label="Software" />
          <HeaderItem label="Outros" />
        </div>
      </section>
    </header>
  );
}
