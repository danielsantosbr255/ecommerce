import CartItems from "./_components/CartItems";
import { FaCartArrowDown } from "react-icons/fa";

export default function CartPage() {
  return (
    <main className="flex flex-col w-full h-full md:max-w-10/12 px-4 md:px-0 mx-auto py-5">
      <h1 className="flex w-full items-center justify-center gap-4 text-lg py-6 font-bold text-primary">
        <FaCartArrowDown size={20} />
        Carrinho
      </h1>

      <section className="flex flex-col gap-4 w-full h-full items-center">
        <CartItems />
      </section>
    </main>
  );
}
