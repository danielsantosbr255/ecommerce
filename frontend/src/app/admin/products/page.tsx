import { FaBox, FaPlus } from "react-icons/fa";
import CurrencyUtil from "@/utils/currency.util";
import { productService } from "@/services/products";
import Pagination from "@/components/ui/Pagination";
import ProductImage from "@/components/products/ProductImage";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Button from "@/components/ui/Button";

const page = async () => {
  const result = await productService.getAll(1, 8);
  if (!result) return null;

  const { products, pagination } = result;
  const { currentPage, pageSize, totalPages, totalItems } = pagination;

  return (
    <main className="flex flex-col w-full gap-4">
      <Table>
        <TableCaption className="text-center py-4">
          <div className="relative flex justify-center items-center gap-2 text-tx-primary font-semibold text-xl">
            <FaBox className="text-primary" size={25} />
            <p>Listagem de produtos</p>

            <span className="absolute top-0 right-3 bg-primary/20 text-primary font-normal text-sm px-2 py-1 rounded-xl">
              {totalItems > 0 ? `${totalItems} produtos` : "Nenhum produto"}
            </span>

            <Button className="absolute left-3 top-1/2 -translate-y-1/2 !rounded-2xl !text-sm" href="/admin/products/new">
              <FaPlus className="mr-1" size={10} /> Novo produto
            </Button>
          </div>
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-bg-overlay/10 text-sm">
            <TableHead>Imagem</TableHead>
            <TableHead>Título</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Categoria</TableHead>
            <TableHead className="text-center">Estoque</TableHead>
            <TableHead className="text-center">Valor</TableHead>
            <TableHead className="text-right">Criado em</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-bg-secondary divide-lines">
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="items-center">
                <div className="aspect-square w-16 h-16">
                  <ProductImage product={product} />
                </div>
              </TableCell>

              <TableCell className="truncate max-w-[200px] overflow-hidden">{product.title}</TableCell>
              <TableCell className="text-center overflow-hidden">
                <span className="bg-green-400/20 text-sm px-2 py-1 font-medium rounded-full text-green-600 uppercase">
                  {product.isActive ? "Ativo" : "Inativo"}
                </span>
              </TableCell>
              <TableCell className="text-center">{product.category.name}</TableCell>
              <TableCell className="text-center">{product.stock}</TableCell>
              <TableCell className="text-center">
                <span>{CurrencyUtil.formatCurrency(product.price)}</span>
              </TableCell>
              <TableCell className="text-right">{new Date(product.createdAt).toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <button className="text-primary hover:underline cursor-pointer">Editar</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination currentPage={currentPage} totalPages={totalPages} path={"/admin/products"} pageSize={pageSize} />
    </main>
  );
};

export default page;
