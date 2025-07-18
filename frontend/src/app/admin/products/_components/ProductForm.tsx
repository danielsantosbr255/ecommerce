"use client";

import { Product } from "@/types";
import { useCallback } from "react";
import { toast } from "react-toastify";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { productService } from "@/services/products";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useForm, useFieldArray } from "react-hook-form";
import ImageInput from "@/components/ui/inputs/ImageInput";
import { useProductFormOptions } from "./useProductFormOptions";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { ProductFormData, productSchema, productSpecificationSchema } from "./CreateProductSchema";

const ProductForm = ({ product }: { product?: Product }) => {
  const { categories, brands, loadingOptions, optionsError } = useProductFormOptions();

  const defaultValues = {
    isActive: product?.isActive ?? true,
    discount: product?.discount ?? 0,
    specifications: product?.specifications ?? [{ name: "", value: "" }],
    images: [],
    title: product?.title ?? "",
    price: product?.price ?? 0,
    stock: product?.stock ?? 0,
    description: product?.description ?? "",
    categoryId: product?.categoryId ?? "",
    brandId: product?.brandId ?? "",
  };

  const { register, handleSubmit, formState, reset, setValue, control } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues,
  });

  const { errors, isSubmitting } = formState;
  const { fields, append, remove } = useFieldArray({ control, name: "specifications" });

  const prepareFormData = (data: ProductFormData): FormData => {
    const formData = new FormData();

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key as keyof ProductFormData];

        if (key === "images") {
          data.images.forEach((file) => formData.append("images", file));
        } else if (key === "specifications") {
          if (value && (value as (typeof productSpecificationSchema._type)[]).length > 0) {
            formData.append("specifications", JSON.stringify(value));
          }
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      }
    }
    return formData;
  };

  const onSubmit = useCallback(
    async (data: ProductFormData) => {
      try {
        const formData = prepareFormData(data);
        await productService.create(formData);

        reset();
        setValue("images", []);
        toast.success("Produto adicionado com sucesso!");
      } catch (err) {
        if (err instanceof Error) toast.error(err.message);
        else toast.error("Erro ao adicionar produto. Tente novamente.");
      }
    },
    [reset, setValue]
  );

  if (loadingOptions) {
    return <div className="bg-bg-secondary shadow-xs rounded-2xl p-6 text-center">Carregando opções...</div>;
  }

  if (optionsError) {
    return (
      <div className="bg-bg-secondary shadow-xs rounded-2xl p-6 text-center">
        <ErrorMessage message={optionsError} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-lg font-semibold mb-4 text-center">{product ? "Editar produto" : "Novo produto"}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-4">
        <section className="bg-bg-secondary shadow-xs rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Input label="Título" id="title" {...register("title")} placeholder="Informe o título do produto" />
            {errors.title && <ErrorMessage message={errors.title.message} />}
          </div>

          <div className="flex flex-col gap-1">
            <Input label="Preço" id="price" type="number" {...register("price")} placeholder="Informe o preço do produto" />
            {errors.price && <ErrorMessage message={errors.price.message} />}
          </div>

          <div className="flex flex-col gap-1">
            <Input label="Estoque" id="stock" type="number" {...register("stock")} placeholder="Informe o estoque do produto" />
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
              className="shadow-xs appearance-none border-2 border-lines placeholder-tx-muted/50 rounded-lg w-full py-2 px-3 leading-tight focus:outline-primary bg-bg-secondary"
              placeholder="Informe a descrição do produto"
            />
            {errors.description && <ErrorMessage message={errors.description.message} />}
          </div>

          <div className="col-span-full flex flex-col gap-1">
            <ImageInput onChange={(files) => setValue("images", Array.from(files))} />
            {errors.images && <ErrorMessage message={errors.images.message} />}
          </div>
        </section>

        {/* Seção de Especificações */}
        <section className="bg-bg-secondary flex flex-col shadow-xs rounded-2xl p-6 gap-4">
          <h2 className="text-md font-semibold mb-3 gap-2 flex items-center justify-between">
            Especificações do Produto
            <button
              type="button"
              onClick={() => append({ name: "", value: "" })}
              className="text-tx-primary hover:text-tx-primary/80 cursor-pointer items-center"
            >
              <FaPlusCircle size={22} />
            </button>
          </h2>

          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-[1fr_1fr_auto] gap-2">
              <Input
                id={`specifications.${index}.name`}
                label={`Nome`}
                {...register(`specifications.${index}.name`)}
                placeholder="ex: Tamanho"
              />
              <Input
                id={`specifications.${index}.value`}
                label={`Valor`}
                {...register(`specifications.${index}.value`)}
                placeholder="ex: 42"
              />
              <button onClick={() => remove(index)} className="text-tx-error hover:text-tx-error/80 cursor-pointer">
                <FaMinusCircle size={22} />
              </button>
            </div>
          ))}
        </section>

        <div className="col-span-full">
          <Button type="submit" className="font-bold" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
