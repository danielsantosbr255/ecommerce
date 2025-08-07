import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useImageUploader } from "./useImageUploader";
import { uploadImages } from "@/services/uploadImages";
import { productCreateSchema, ProductFormData, ProductUpdateFormValues, productUpdateSchema } from "@/lib/schemas/product.schema";

interface UseProductFormProps {
  initialData?: ProductUpdateFormValues;
  onSubmitData: (data: ProductFormData) => void;
}

export function useProductForm({ initialData, onSubmitData }: UseProductFormProps) {
  const schema = initialData ? productUpdateSchema : productCreateSchema;

  const { register, handleSubmit, control, setValue, reset, formState } = useForm<ProductFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || { specifications: [] },
    mode: "onChange",
  });

  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({ control, name: "specifications" as never });
  const { images, addImages, removeImage, resetImages } = useImageUploader(initialData?.images, 5);

  const onSubmit = async (data: ProductFormData) => {
    try {
      const newFiles = images.filter((img) => img instanceof File) as File[];
      const productImages = await uploadImages(newFiles, "ecommerce/products", 5);

      data.images = productImages;

      onSubmitData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (initialData) {
      reset(initialData);
      resetImages(initialData.images || []);
      setValue("images", initialData.images || []);
    }
  }, [initialData, reset, resetImages, setValue]);

  return {
    register,
    handleSubmit,
    onSubmit,
    control,
    fields,
    append,
    remove,
    errors,
    images,
    addImages,
    removeImage,
  };
}
