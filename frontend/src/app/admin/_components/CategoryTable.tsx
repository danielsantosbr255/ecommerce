"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Category } from "@/types";
import { toast } from "react-toastify";
import Button from "@/components/ui/Button";
import { FaPencil } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { BiSolidCategoryAlt } from "react-icons/bi";
import LoadingState from "@/components/ui/LoadingState";
import { categoryService } from "@/services/categories";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Actions = ({ category }: { category: Category }) => {
  const router = useRouter();
  const [isPeding, setIsPeding] = useState(false);

  const handleRemove = async (id: string) => {
    try {
      setIsPeding(true);
      await categoryService.delete(id);
      toast.success("Categoria excluída com sucesso!");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Erro ao excluir categoria");
    } finally {
      setIsPeding(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-3">
      <Link href={`/admin/categories/edit/${category.slug}`} className="text-primary hover:underline cursor-pointer">
        <FaPencil size={18} className="hover:scale-110 transition cursor-pointer" />
      </Link>

      <button
        type="button"
        disabled={isPeding}
        className={`text-tx-error hover:scale-110 transition cursor-pointer ${
          isPeding ? "pointer-events-none opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => handleRemove(category.id)}
      >
        <FaTimes size={20} />
      </button>
    </div>
  );
};

function CategorysTable() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getAll,
    staleTime: 60 * 1000,
  });

  if (isLoading) return <LoadingState label="Carregando categorias" />;

  if (!categories || categories.length === 0) {
    return (
      <Table>
        <TableCaption className="text-center py-4">
          <p className="font-semibold text-xl">Nenhuma categoria cadastrada</p>
        </TableCaption>
      </Table>
    );
  }

  const totalItems = categories.length;

  return (
    <Table>
      <TableCaption className="text-center py-4">
        <div className="relative flex justify-center items-center gap-2 font-semibold text-xl">
          <BiSolidCategoryAlt className="text-primary" size={25} />
          <p>Listagem de categorias</p>

          <span className="absolute top-0 right-3 bg-primary/20 text-primary font-normal text-sm px-2 py-1 rounded-xl">
            {totalItems > 0 ? `${totalItems} categorias` : "Nenhum categoria"}
          </span>

          <Button className="absolute left-3 top-1/2 -translate-y-1/2 !rounded-2xl !text-sm" href="/admin/categories/new">
            <FaPlus className="mr-1" size={10} /> Nova categoria
          </Button>
        </div>
      </TableCaption>

      <TableHeader>
        <TableRow className="bg-bg-overlay/10 text-sm">
          <TableHead>Imagem</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead className="text-center">Criado em</TableHead>
          <TableHead className="text-center">Atualizado em</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="bg-bg-secondary divide-lines">
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell className="text-center">
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.name}
                  className="w-8 h-8 object-cover rounded-full"
                  width={40}
                  height={40}
                  priority
                />
              ) : (
                <BiSolidCategoryAlt size={20} />
              )}
            </TableCell>
            <TableCell className="truncate max-w-[200px] overflow-hidden">{category.name}</TableCell>
            <TableCell className="text-center overflow-hidden">{new Date(category.createdAt).toLocaleString()}</TableCell>
            <TableCell className="text-center overflow-hidden">{new Date(category.updatedAt).toLocaleString()}</TableCell>

            <TableCell className="text-right">
              <Actions category={category} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default CategorysTable;
