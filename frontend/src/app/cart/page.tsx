import "react-toastify/dist/ReactToastify.css";
import EmptyCart from "@/components/cart/EmptyCart";
import CartUtils from "@/utils/cart.util";
import CartItems from "@/components/cart/CartItems";
import { useAuth } from "@/contexts/AuthContext";

export default async function CartPage() {
  // const { accessToken } = useAuth();
  // const items = await CartUtils.fetchCartItems(accessToken);

  // if (!items) return <EmptyCart />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-3xl font-bold">Seu Carrinho</h1>
      {/* <CartItems accessToken={accessToken} /> */}
    </div>
  );
}
