"use client";

import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form"; // Importar useFieldArray
import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/inputs/Select";
import { productService } from "@/services/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryService } from "@/services/categories";
import ErrorMessage from "@/components/ui/ErrorMessage";
import ImageInput from "@/components/ui/inputs/ImageInput";

// Esquema de validação para o formulário do produto
const productSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  price: z.coerce.number().positive("Preço inválido"),
  stock: z.coerce.number().int().min(1, "Estoque inválido"),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
  brandId: z.string().min(1, "Marca é obrigatória"),
  description: z.string().min(1, "Descrição é obrigatória"),
  images: z.array(z.any()).min(1, "Pelo menos uma imagem é obrigatória"),
  isActive: z.boolean().optional().default(true),
  discount: z.coerce.number().optional().default(0),
  specifications: z.array( // Array de objetos para especificações
    z.object({
      name: z.string().min(1, "Nome da especificação é obrigatório"),
      value: z.string().min(1, "Valor da especificação é obrigatório"),
    })
  ).optional().default([]),
});

export type ProductFormData = z.infer<typeof productSchema>;

const AdminProductForm = () => {
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const [brands, setBrands] = useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    control, // Adicionar control para useFieldArray
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      price: 0,
      stock: 0,
      categoryId: "",
      brandId: "",
      description: "",
      images: [],
      isActive: true,
      discount: 0,
      specifications: [], // Garantir que specifications seja um array vazio por padrão
    }
  });

  // Hook para gerenciar o array de especificações
  const { fields, append, remove } = useFieldArray({
    control,
    name: "specifications",
  });

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();

      data.images.forEach((img: File) => {
        formData.append("images", img);
      });

      for (const key in data) {
        if (key !== "images" && key !== "specifications") {
          formData.append(key, String(data[key as keyof ProductFormData]));
        }
      }

      // Adicionar especificações como string JSON
      if (data.specifications && data.specifications.length > 0) {
        formData.append("specifications", JSON.stringify(data.specifications));
      }

      await productService.create(formData);
      reset();
      setValue("images", []);
      // reset do useFieldArray é implicito com o reset do useForm
      alert("Produto adicionado com sucesso!");
    } catch (err) {
      console.error("Erro ao adicionar produto:", err);
      setError("Falha ao adicionar produto. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesFromApi = await categoryService.getAll();
      if (categoriesFromApi) {
        setCategories(
          categoriesFromApi.map((category: any) => ({
            value: category.id,
            label: category.name,
          }))
        );
      }
    } catch (err) {
      console.error("Erro ao buscar categorias:", err);
      setError("Falha ao carregar categorias.");
    }
  };

  const fetchBrands = async () => {
    try {
      // Substituir com sua própria lógica de serviço para buscar marcas
      const dummyBrands = [
        { id: "1", name: "Marca A" },
        { id: "2", name: "Marca B" },
      ];
      setBrands(
        dummyBrands.map((brand) => ({
          value: brand.id,
          label: brand.name,
        }))
      );
    } catch (err) {
      console.error("Erro ao buscar marcas:", err);
      setError("Falha ao carregar marcas.");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  return (
    <div className="bg-white shadow-xs rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-tx-primary mb-4">Adicionar Novo Produto</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <Input className="bg-white" label="Nome" id="title" {...register("title")} />
          {errors.title && <ErrorMessage message={errors.title.message} />}
        </div>

        <div className="flex flex-col gap-1">
          <Input className="bg-white" label="Preço" id="price" type="number" {...register("price")} />
          {errors.price && <ErrorMessage message={errors.price.message} />}
        </div>

        <div className="flex flex-col gap-1">
          <Input label="Estoque" id="stock" type="number" {...register("stock")} className="bg-white" />
          {errors.stock && <ErrorMessage message={errors.stock.message} />}
        </div>

        <div className="flex flex-col gap-1">
          <Select label="Categoria" id="categoryId" {...register("categoryId")} options={categories} />
          {errors.categoryId && <ErrorMessage message={errors.categoryId.message} />}
        </div>

        <div className="flex flex-col gap-1">
          <Select label="Marca" id="brandId" {...register("brandId")} options={brands} />
          {errors.brandId && <ErrorMessage message={errors.brandId.message} />}
        </div>

        <div className="col-span-full flex flex-col gap-1">
          <label htmlFor="description" className="block text-tx-secondary text-sm font-bold mb-2">
            Descrição:
          </label>
          <textarea
            id="description"
            {...register("description")}
            rows={4}
            className="shadow-xs appearance-none border-2 border-lines rounded-lg w-full py-2 px-3 leading-tight focus:outline-primary bg-white"
          />
          {errors.description && <ErrorMessage message={errors.description.message} />}
        </div>

        <div className="col-span-full flex flex-col gap-1">
          <ImageInput onChange={(files) => setValue("images", Array.from(files))} />
          {errors.images && <ErrorMessage message={errors.images.message} />}
        </div>

        {/* Seção de Especificações */}
        <div className="col-span-full mt-4 border-t pt-4 border-lines">
          <h4 className="text-md font-semibold text-tx-primary mb-3">Especificações do Produto</h4>
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 items-end">
              <div className="flex flex-col gap-1">
                <Input
                  label={`Nome da Especificação ${index + 1}`}
                  {...register(`specifications.${index}.name`)}
                  className="bg-white"
                />
                {errors.specifications?.[index]?.name && (
                  <ErrorMessage message={errors.specifications[index]?.name?.message} />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Input
                  label={`Valor da Especificação ${index + 1}`}
                  {...register(`specifications.${index}.value`)}
                  className="bg-white"
                />
                {errors.specifications?.[index]?.value && (
                  <ErrorMessage message={errors.specifications[index]?.value?.message} />
                )}
              </div>
              <Button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 text-tx-on-primary px-4 py-2 rounded-lg font-bold h-fit"
              >
                Remover
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => append({ name: "", value: "" })}
            className="bg-secondary text-tx-on-primary px-4 py-2 rounded-lg font-bold"
          >
            Adicionar Especificação
          </Button>
          {errors.specifications && typeof errors.specifications.message === 'string' && (
            <ErrorMessage message={errors.specifications.message} />
          )}
        </div>

        {error && (
          <div className="col-span-full">
            <ErrorMessage message={error} />
          </div>
        )}

        <div className="col-span-full">
          <Button
            type="submit"
            className="bg-primary text-tx-on-primary px-4 font-bold"
            disabled={isSubmitting || loading}
          >
            {isSubmitting || loading ? "Adicionando..." : "Adicionar Produto"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;