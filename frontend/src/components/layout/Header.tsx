import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="flex flex-col w-full z-50 bg-navbar shadow-xs h-auto border-b border-lines">
      <Navbar />

      {/* <section className="bg-yellow-400 flex w-full justify-center items-center">
        <div className="flex w-full py-1 text-tx-on-primary truncate text-xs md:text-sm justify-around items-center md:font-medium md:max-w-4/5 mx-auto">
          <span className="flex uppercase justify-center w-full items-center">Categoria</span>
          <span className="flex uppercase justify-center w-full items-center">Produtos</span>
          <span className="flex uppercase justify-center w-full items-center">Frete Grátis</span>
          <span className="flex uppercase justify-center w-full items-center">Hardware</span>
          <span className="flex uppercase justify-center w-full items-center">Software</span>
          <span className="flex uppercase justify-center w-full items-center">Outros</span>
        </div>
      </section> */}
    </header>
  );
}
