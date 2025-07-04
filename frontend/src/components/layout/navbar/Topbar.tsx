import React from "react";
import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin, FaMailBulk } from "react-icons/fa";

function Topbar({ className }: { className?: string }) {
  return (
    <section
      className={`${className} hidden lg:flex w-full justify-center border-b border-lines/20 items-center text-xs transition-all duration-300 ease-initial overflow-hidden`}
    >
      <div className="grid grid-cols-3 w-full max-w-10/12 py-1 px-2 gap-2 items-center">
        <div className="flex text-tx-primary justify-start items-center gap-2">
          <Link
            href="https://www.instagram.com/daniel_santosdev/"
            target="_blank"
            className="bg-gray-200 p-0.5 rounded-md hover:text-primary transition duration-300"
          >
            <FaInstagram size={16} />{" "}
          </Link>
          <Link
            href="https://github.com/danielsantosbr255"
            target="_blank"
            className="bg-gray-200 p-0.5 rounded-md hover:text-primary transition duration-300"
          >
            <FaGithub size={16} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/daniel-santos-7826051b4/"
            target="_blank"
            className="bg-gray-200 p-0.5 rounded-md hover:text-primary transition duration-300"
          >
            <FaLinkedin size={16} />
          </Link>
          <Link
            href="mailto:asdanielsantos@gmail.com"
            className="bg-gray-200 p-0.5 rounded-md hover:text-primary transition duration-300"
          >
            <FaMailBulk size={16} />
          </Link>
        </div>

        <div className="flex justify-center items-center">
          <h1 className="text-tx-primary font-medium">PROJETO DE ESTUDO [WIP]</h1>
        </div>

        <div className="flex text-tx-primary justify-end items-center">
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
  );
}

export default Topbar;
