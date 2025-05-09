import CartItems from "@/components/cart/CartItems";
import { cartService } from "@/services/carts";
import { userService } from "@/services/users";
import { ShoppingCart } from "lucide-react";

export default async function CartPage() {
  const user = await userService.getOwn();

  if (!user) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <h1>Faça login para ver seu carrinho</h1>
      </div>
    );
  }

  const cart = await cartService.getOwnCart();

  return (
    <main className="flex flex-col w-full h-full gap-4 max-w-10/12 mx-auto items-center justify-center">
      <section className="flex flex-col gap-4 p-5 w-full h-full items-center">
        <h1 className="flex justify-self-start w-full items-center gap-4 text-3xl py-4 font-medium text-tx-secondary">
          <ShoppingCart size={35} />
          Seu Carrinho
        </h1>

        <CartItems cartItems={cart} />
      </section>
    </main>
  );
}
