import Orders from "../_components/Orders";
import { FaShoppingBasket } from "react-icons/fa";

function MyOrders() {
  return (
    <main className="flex flex-col w-full flex-1 p-4 md:px-4 md:max-w-10/12 mx-auto">
      <section className="flex w-full border-b border-lines p-4 items-center gap-3 my-2">
        <FaShoppingBasket className="text-primary inline-block" size={24} />
        <h1 className="text-lg font-bold text-tx-secondary">Meus Pedidos</h1>
      </section>
      <Orders />
    </main>
  );
}

export default MyOrders;
