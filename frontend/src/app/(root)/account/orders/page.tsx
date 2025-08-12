import Orders from "../_components/Orders";
import { FaShoppingBasket } from "react-icons/fa";
import SessionLabel from "@/components/ui/SessionLabel";

function MyOrders() {
  return (
    <main className="flex flex-col w-full flex-1 p-6 gap-4 md:px-4 md:max-w-10/12 mx-auto">
      <SessionLabel label="Meus Pedidos" icon={<FaShoppingBasket size={25} />} />
      <Orders />
    </main>
  );
}

export default MyOrders;
