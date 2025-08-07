import { z } from "zod";

export const addressSchema = z.object({
  label: z.string().min(3, "Nome do endereço deve ter pelo menos 3 caracteres").optional().nullable(),
  street: z.string().min(3, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(3, "Bairro é obrigatório"),
  city: z.string().min(2, "Cidade é obrigatória"),
  state: z.string().min(2, "Estado é obrigatório"),
  country: z.string().min(2, "País é obrigatório"),
  zipCode: z.string().regex(/^\d{5}-?\d{3}$/, "CEP inválido"),
  isDefault: z.boolean().optional(),
});

export type Address = z.infer<typeof addressSchema>;
