import { FaChevronDown, FaSalesforce } from "react-icons/fa";
import CategoriesMenu from "./CategoriesMenu";

const HeaderItem = ({ label }: { label: string }) => {
  return (
    <div className="text-tx-secondary border-b-2 border-transparent hover:text-primary hover:border-primary w-36 justify-center flex items-center gap-2 p-2 transition duration-300 cursor-pointer">
      {label} <FaChevronDown size={12} />
    </div>
  );
};

function SectionsBar({ className }: { className?: string }) {
  return (
    <section className={`${className} hidden md:grid grid-cols-[20%_auto_20%] gap-2 max-w-10/12 mx-auto`}>
      {/* <div className="flex items-center justify-between bg-bg-primary text-tx-secondary text-xs md:text-[16px] font-medium px-5 py-3 gap-2 rounded-lg w-full"> */}
      <CategoriesMenu />
      {/* </div> */}

      <div className="flex gap-2 text-tx-on-primary text-xs md:text-[16px] justify-around items-center md:font-medium w-full">
        <HeaderItem label="Home" />
        <HeaderItem label="Atendimento" />
        <HeaderItem label="Frete Grátis" />
        <HeaderItem label="Hardware" />
        <HeaderItem label="Mais" />
      </div>

      <div className="flex items-center justify-center text-primary text-xs md:text-[16px] font-medium gap-2 w-full border-2 border-transparent hover:border-primary hover:bg-bg-secondary transition duration-300 cursor-pointer rounded-lg">
        <FaSalesforce size={16} />
        <span className="hidden md:inline">Promocões do dia</span>
      </div>
    </section>
  );
}

export default SectionsBar;
