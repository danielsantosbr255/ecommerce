import SessionLabel from "@/components/ui/SessionLabel";
import React from "react";
import { FaThumbsUp } from "react-icons/fa";

function Reviews() {
  return (
    <main className="flex flex-col w-full flex-1 p-4 md:px-4 md:max-w-10/12 mx-auto">
      <SessionLabel label="Avaliações" icon={<FaThumbsUp size={25} />} />
      <section className="flex flex-col w-full h-full justify-center items-center">
        Em breve, essa funcionalidade estará disponível.
      </section>
    </main>
  );
}

export default Reviews;
