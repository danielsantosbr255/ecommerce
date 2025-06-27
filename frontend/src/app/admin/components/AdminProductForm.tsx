"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/inputs/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageInput from "@/components/ui/inputs/ImageInput";
import { useState } from "react";

const productSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  price: z.coerce.number().positive("Preço inválido"),
  stock: z.coerce.number().int().min(1, "Estoque inválido"),
  categoryId: z.string().min(1, "Categoria obrigatória"),
  description: z.string().min(1, "Descrição obrigatória"),
});

type ProductFormData = z.infer<typeof productSchema>;

const AdminProductForm = () => {
  const [images, setImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: ProductFormData) => {
    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));

    for (const key in data) {
      formData.append(key, data[key as keyof ProductFormData].toString());
    }

    reset();
    setImages([]);
  };

  return (
    <div className="bg-white shadow-xs rounded-md p-6">
      <h3 className="text-lg font-semibold text-tx-primary mb-4">Adicionar Novo Produto</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input className="bg-white" label="Nome:" id="title" {...register("title")} />
        <Input className="bg-white" label="Preço:" id="price" type="number" {...register("price")} />

        <Input
          label="Estoque:"
          id="stock"
          type="number"
          {...register("stock")}
          className="bg-white"
          // error={errors.stock?.message}
        />

        <Select
          label="Categoria:"
          id="categoryId"
          {...register("categoryId")}
          // error={errors.categoryId?.message}
          options={[
            { value: "", label: "Selecione" },
            { value: "Roupas", label: "Roupas" },
            { value: "Calçados", label: "Calçados" },
            { value: "Eletrônicos", label: "Eletrônicos" },
            { value: "Livros", label: "Livros" },
            { value: "Acessórios", label: "Acessórios" },
          ]}
        />

        <div className="col-span-full">
          <label htmlFor="description" className="block text-tx-primary text-sm font-bold mb-2">
            Descrição:
          </label>
          <textarea
            id="description"
            {...register("description")}
            className="shadow-xs appearance-none border rounded w-full py-2 px-3 text-tx-primary leading-tight focus:outline-none focus:shadow-xs-outline"
          />
          {errors.description && <span className="text-sm text-red-500">{errors.description.message}</span>}
        </div>

        <div className="col-span-full">
          <ImageInput onChange={setImages} />
        </div>

        <div className="col-span-full">
          <Button className="bg-primary text-tx-on-primary px-4 font-bold">Adicionar Produto</Button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
