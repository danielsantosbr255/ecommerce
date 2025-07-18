import Link from "next/link";
import { orderService } from "@/services/orders";
import { FaUser } from "react-icons/fa";
import CurrencyUtil from "@/utils/currency.util";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaBoxesPacking } from "react-icons/fa6";

export default async function OrdersPage() {
  const orders = await orderService.getAll();

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col gap-4 p-6 bg-bg-secondary rounded-lg shadow-xs">
        <p className="text-tx-primary text-center font-semibold">Nenhum pedido encontrado.</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col w-full gap-4">
      <Table>
        <TableCaption className="text-center py-4">
          <div className="relative flex justify-center items-center gap-2 text-tx-primary font-semibold text-xl">
            <FaBoxesPacking className="text-primary" size={25} />
            <p>Listagem de pedidos</p>

            <span className="absolute top-0 right-3 bg-primary/20 text-primary font-normal text-sm px-2 py-1 rounded-xl">
              {orders.length > 0 ? `${orders.length} pedidos` : "Nenhum pedido"}
            </span>
          </div>
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-bg-overlay/10 text-sm">
            <TableHead>ID</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-center">Total</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Criado em</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-bg-secondary divide-lines">
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="py-5">{order.id}</TableCell>
              <TableCell className="items-center">
                <span className="flex items-center gap-2">
                  <FaUser /> {order.user.name}
                </span>
              </TableCell>
              <TableCell>{order.user.email}</TableCell>
              <TableCell className="text-center">{CurrencyUtil.formatCurrency(order.totalPrice)}</TableCell>
              <TableCell className="text-center">
                <span className="bg-primary/20 text-primary font-medium text-sm px-2 py-1 rounded-full uppercase">
                  {order.status}
                </span>
              </TableCell>
              <TableCell className="text-right">{new Date(order.createdAt).toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <Link href={`/admin/orders/${order.id}`} className="text-primary hover:underline">
                  Ver Detalhes
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell className="pl-5" colSpan={6}>
              Total de pedidos
            </TableCell>
            <TableCell className="text-right pr-5">{orders.length}</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </main>
  );
}
