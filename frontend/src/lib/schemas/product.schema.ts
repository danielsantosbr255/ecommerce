import { z } from "zod";

const fileSchema = z.instanceof(File, { message: "Arquivo inválido" });

export const imageSchema = z.union([
  z.object({
    id: z.string().uuid({ message: "ID inválido! ID deve ser um UUID" }),
    order: z.number({ required_error: "Ordem é obrigatória" }).int().min(0, "Ordem inválida"),
    url: z.string().url({ message: "URL inválida" }),
    publicId: z.string(),
    alt: z.string().optional(),
  }),
  fileSchema,
]);

export const specificationSchema = z.object({
  name: z.string().min(1, "O nome da especificação é obrigatório"),
  value: z.string().min(1, "O valor da especificação é obrigatório"),
});

export const productBaseSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5, "Título deve ter pelo menos 5 caracteres"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  price: z.number({ required_error: "Preço é obrigatório" }).min(0, "Preço inválido"),
  discount: z.number().int().min(0).max(100).default(0),
  stock: z.number({ required_error: "Estoque é obrigatório" }).int().min(0, "Estoque inválido"),
  brandId: z.string({ required_error: "Marca é obrigatória" }).uuid({ message: "ID inválido! ID deve ser um UUID" }),
  categoryId: z.string({ required_error: "Categoria é obrigatória" }).uuid({ message: "ID invildo! ID deve ser um UUID" }),
  specifications: z.array(specificationSchema),
  rating: z.number().min(0).max(5).default(0),
  isActive: z.boolean().default(true),
  images: z.array(imageSchema).min(1, "É necessário pelo menos uma imagem").max(5, "É possível selecionar no máximo 5 imagens"),
});

export const productCreateSchema = productBaseSchema;
export const productUpdateSchema = productBaseSchema.partial();

export type ProductSpecification = z.infer<typeof specificationSchema>;
export type ProductCreateFormValues = z.infer<typeof productCreateSchema>;
export type ProductUpdateFormValues = z.infer<typeof productUpdateSchema>;

export type ProductFormData = ProductCreateFormValues | ProductUpdateFormValues;
