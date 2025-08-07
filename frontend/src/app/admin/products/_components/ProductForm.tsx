"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";
import { ProductImage } from "@/types";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import TextArea from "@/components/ui/TextArea";
import { productService } from "@/services/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductImagesInput } from "./ProductImagesInput";
import { useFieldArray, useForm } from "react-hook-form";
import { useImageUploader } from "@/hooks/useImageUploader";
import { useProductFormOptions } from "./useProductFormOptions";
import { ProductSpecifications } from "./ProductSpecifications";
import { productCreateSchema, productUpdateSchema, ProductFormData, ProductUpdateFormValues } from "@/lib/schemas/product.schema";

interface ProductFormProps {
  initialData?: ProductUpdateFormValues;
}

function isExistingImage(img: ProductImage | object): img is ProductImage {
  return typeof img === "object" && "id" in img && "url" in img;
}

const ProductForm = ({ initialData }: ProductFormProps) => {
  const schema = initialData ? productUpdateSchema : productCreateSchema;
  const { categories, brands } = useProductFormOptions();
  const router = useRouter();

  const { register, handleSubmit, control, setValue, reset, trigger, formState } = useForm<ProductFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || { specifications: [] },
    mode: "onChange",
  });

  const { errors, isSubmitting } = formState;
  const { fields, append, remove } = useFieldArray({ control, name: "specifications" as never });
  const { images, addImages, removeImage, resetImages } = useImageUploader(initialData?.images, 5);

  const onSubmit = async (data: ProductFormData) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key !== "images" && key !== "specifications") {
          if (value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        }
      });

      if (Array.isArray(data.specifications)) {
        formData.append("specifications", JSON.stringify(data.specifications));
      }

      const newFiles = images.filter((img) => img instanceof File) as File[];
      const keptImages = images.filter(isExistingImage) as ProductImage[];

      newFiles.forEach((file) => formData.append("images", file));
      formData.append("keptImages", JSON.stringify(keptImages));

      if (initialData && initialData.id) await productService.update(initialData.id, formData);
      else await productService.create(formData);

      toast.success("Produto salvo com sucesso!");
      router.push("/admin/products");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Erro ao salvar produto");
    }
  };

  useEffect(() => {
    if (initialData) {
      reset(initialData);
      resetImages(initialData.images || []);
      setValue("images", initialData.images || []);
    }
  }, [initialData, reset, resetImages, setValue]);

  useEffect(() => {
    setValue("images", images);
    trigger("images");
  }, [images, setValue, trigger]);

  return (
    <div>
      <h1 className="text-lg font-semibold mb-4 text-center">{initialData ? "Editar produto" : "Novo produto"}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-4">
        <section className="bg-bg-secondary shadow-xs rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input label="Título" id="title" {...register("title")} error={errors.title} />
          <Input
            label="Preço"
            id="price"
            type="number"
            {...register("price", { setValueAs: (v) => (v === "" ? undefined : Number(v)) })}
            error={errors.price}
          />

          <Input
            label="Estoque"
            id="stock"
            type="number"
            {...register("stock", { setValueAs: (v) => (v === "" ? undefined : Number(v)) })}
            error={errors.stock}
          />

          <Input
            label="Desconto"
            id="discount"
            type="number"
            {...register("discount", { setValueAs: (v) => (v === "" ? undefined : Number(v)) })}
            error={errors.discount}
          />
          <Select label="Categoria" id="categoryId" {...register("categoryId")} options={categories} error={errors.categoryId} />
          <Select label="Marca" id="brandId" {...register("brandId")} options={brands} error={errors.brandId} />

          <TextArea
            rows={4}
            id="description"
            label="Descrição"
            {...register("description")}
            placeholder="Informe a descrição do produto"
            error={errors.description}
          />

          <ProductImagesInput
            images={images}
            onAdd={addImages}
            onRemove={removeImage}
            className="col-span-full flex flex-col"
            error={errors.images?.message as string}
          />
        </section>

        <ProductSpecifications
          fields={fields}
          register={register}
          remove={remove}
          append={append}
          error={errors.specifications}
        />

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
