"use client";

import Link from "next/link";
import { Product } from "@/types";
import { toast } from "react-toastify";
import Button from "@/components/ui/Button";
import { FaPencil } from "react-icons/fa6";
import CurrencyUtil from "@/utils/currency.util";
import { productService } from "@/services/products";
import { FaBoxes, FaPlus, FaTimes } from "react-icons/fa";
import ProductImage from "@/components/products/ProductImage";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  products: Product[];
  totalItems: number;
}

const Actions = ({ product }: { product: Product }) => {
  const router = useRouter();
  const [isPeding, setIsPeding] = useState(false);
  const queryClient = useQueryClient();

  const handleRemove = async (id: string) => {
    try {
      setIsPeding(true);
      await productService.delete(id);
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produto excluído com sucesso!");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Erro ao excluir produto");
    } finally {
      setIsPeding(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-3">
      <Link href={`/admin/products/edit/${product.slug}`} className="text-primary hover:underline cursor-pointer">
        <FaPencil size={18} className="hover:scale-110 transition cursor-pointer" />
      </Link>

      <button
        type="button"
        disabled={isPeding}
        className={`text-tx-error hover:scale-110 transition cursor-pointer ${
          isPeding ? "pointer-events-none opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => handleRemove(product.id)}
      >
        <FaTimes size={20} />
      </button>
    </div>
  );
};

function ProductsTable({ products, totalItems }: Props) {
  return (
    <Table>
      <TableCaption className="text-center py-4">
        <div className="relative flex justify-center items-center gap-2 font-semibold text-xl">
          <FaBoxes className="text-primary" size={25} />
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
          <TableHead className="text-center">Imagem</TableHead>
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
            <TableCell className="flex items-center justify-center !p-0">
              <div className="aspect-square w-20 h-20">
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
              <Actions product={product} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ProductsTable;
