import React from "react";
import { FaHeart } from "react-icons/fa";

function Favorites() {
  return (
    <main className="flex flex-col w-full flex-1 p-4 md:px-4 md:max-w-10/12 mx-auto">
      <h1 className="flex w-full border-b border-lines p-4 items-center gap-3 my-2 text-lg font-bold text-tx-primary">
        <FaHeart className="text-primary inline-block" size={24} />
        Favoritos
      </h1>
    </main>
  );
}

export default Favorites;
