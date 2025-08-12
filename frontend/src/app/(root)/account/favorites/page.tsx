import SessionLabel from "@/components/ui/SessionLabel";
import React from "react";
import { FaHeart } from "react-icons/fa";

function Favorites() {
  return (
    <main className="flex flex-col w-full flex-1 p-4 md:px-4 md:max-w-10/12 mx-auto">
      <SessionLabel label="Favoritos" icon={<FaHeart size={25} />} />
      <section className="flex flex-col w-full h-full justify-center items-center">
        Em breve, essa funcionalidade estará disponível.
      </section>
    </main>
  );
}

export default Favorites;
