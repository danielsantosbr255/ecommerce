// productSchema.ts
import { z } from "zod";

export const productSpecificationSchema = z.object({
  name: z.string().min(1, "Nome da especificação é obrigatório"),
  value: z.string().min(1, "Valor da especificação é obrigatório"),
});

export const productSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  price: z.coerce.number().positive("Preço inválido"),
  stock: z.coerce.number().int().min(1, "Estoque inválido"),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
  brandId: z.string().min(1, "Marca é obrigatória"),
  description: z.string().min(1, "Descrição é obrigatória"),
  images: z.array(z.instanceof(File)).min(1, "Pelo menos uma imagem é obrigatória"),
  isActive: z.boolean(),
  discount: z.coerce.number(),
  specifications: z.array(productSpecificationSchema),
});

export type ProductFormData = z.infer<typeof productSchema>;
