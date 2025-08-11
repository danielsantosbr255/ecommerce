"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Brand } from "@/types";
import { toast } from "react-toastify";
import { FaPencil } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { brandService } from "@/services/brands";
import { useQuery } from "@tanstack/react-query";
import { MdLocalFireDepartment } from "react-icons/md";
import LoadingState from "@/components/ui/LoadingState";
import { FaBoxes, FaPlus, FaTimes } from "react-icons/fa";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Actions = ({ brand }: { brand: Brand }) => {
  const router = useRouter();
  const [isPeding, setIsPeding] = useState(false);

  const handleRemove = async (id: string) => {
    try {
      setIsPeding(true);
      await brandService.delete(id);
      toast.success("Marca excluída com sucesso!");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Erro ao excluir marca");
    } finally {
      setIsPeding(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-3">
      <Link href={`/admin/brands/edit/${brand.slug}`} className="text-primary hover:underline cursor-pointer">
        <FaPencil size={18} className="hover:scale-110 transition cursor-pointer" />
      </Link>

      <button
        type="button"
        disabled={isPeding}
        className={`text-tx-error hover:scale-110 transition cursor-pointer ${
          isPeding ? "pointer-events-none opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => handleRemove(brand.id)}
      >
        <FaTimes size={20} />
      </button>
    </div>
  );
};

function BrandsTable() {
  const { data: brands, isLoading } = useQuery({ queryKey: ["brands"], queryFn: () => brandService.getAll(), staleTime: 1800 });

  if (isLoading) return <LoadingState label="Carregando marcas" />;

  if (!brands || brands.length === 0) {
    return (
      <Table>
        <TableCaption className="text-center py-4">
          <p className="font-semibold text-xl">Nenhuma marca cadastrada</p>
        </TableCaption>
      </Table>
    );
  }

  const totalItems = brands.length;

  return (
    <Table>
      <TableCaption className="text-center py-4">
        <div className="relative flex justify-center items-center gap-2 font-semibold text-xl">
          <FaBoxes className="text-primary" size={25} />
          <p>Listagem de marcas</p>

          <span className="absolute top-0 right-3 bg-primary/20 text-primary font-normal text-sm px-2 py-1 rounded-xl">
            {totalItems > 0 ? `${totalItems} marcas` : "Nenhum marca"}
          </span>

          <Button className="absolute left-3 top-1/2 -translate-y-1/2 !rounded-2xl !text-sm" href="/admin/brands/new">
            <FaPlus className="mr-1" size={10} /> Nova marca
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
        {brands.map((brand) => (
          <TableRow key={brand.id}>
            <TableCell className="text-center">
              {brand.image ? (
                <Image src={brand.image} alt={brand.name} className="object-cover" width={40} height={40} priority />
              ) : (
                <MdLocalFireDepartment size={20} />
              )}
            </TableCell>
            <TableCell className="truncate max-w-[200px] overflow-hidden">{brand.name}</TableCell>
            <TableCell className="text-center overflow-hidden">{new Date(brand.createdAt).toLocaleString()}</TableCell>
            <TableCell className="text-center overflow-hidden">{new Date(brand.updatedAt).toLocaleString()}</TableCell>

            <TableCell className="text-right">
              <Actions brand={brand} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default BrandsTable;
