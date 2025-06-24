import { ShoppingCart } from "lucide-react";
import CartItems from "./components/CartItems";

export const dynamic = "force-dynamic";

export default function CartPage() {
  return (
    <main className="flex flex-col w-full h-full max-w-10/12 mx-auto py-5">
      <h1 className="flex w-full items-center justify-center gap-4 text-lg py-6 font-bold text-tx-primary">
        <ShoppingCart size={20} absoluteStrokeWidth />
        Carrinho
      </h1>

      <section className="flex flex-col gap-4 w-full h-full items-center">
        <CartItems />
      </section>
    </main>
  );
}
