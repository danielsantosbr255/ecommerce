import React from "react";
import { FaChevronDown } from "react-icons/fa";

const HeaderItem = ({ label }: { label: string }) => {
  return (
    <div className="border border-lines/50 text-tx-secondary hover:text-tx-on-primary flex justify-between items-center gap-2 px-2 py-1 rounded-md hover:bg-primary/80 transition duration-300 cursor-pointer w-full">
      <span className="flex-1 text-center font-medium">{label}</span>
      <FaChevronDown className="hidden md:flex" />
    </div>
  );
};

function SectionsBar({ className }: { className?: string }) {
  return (
    <section className={`${className} hidden md:flex flex-col md:flex-row gap-2 overflow-hidden`}>
      <div className="flex w-full py-2 gap-2 text-tx-on-primary text-xs md:text-[16px] justify-around items-center md:font-medium lg:max-w-4/5 mx-auto">
        <HeaderItem label="Categoria" />
        <HeaderItem label="Produtos" />
        <HeaderItem label="Frete Grátis" />
        <HeaderItem label="Hardware" />
        <HeaderItem label="Software" />
        <HeaderItem label="Outros" />
      </div>
    </section>
  );
}

export default SectionsBar;
