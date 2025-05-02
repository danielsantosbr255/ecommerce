const { z } = require("zod");

const msg = {
  required: "Campo Obrigatório",
  partial: "Dados Inválidos!",
  minLength: (num) => `Deve ter pelo menos ${num} caracteres`,
  minItems: (num) => `deve ter pelo menos ${num} item(s)`,
  noempty: "Nao pode ser vazio",
  invalidId: "ID inválido! ID deve ser um UUID",
  negative: "Nao pode ser negativo",
  invalid: "inválido!",
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const FileSchema = z.object({
  buffer: z.instanceof(Buffer),
  originalname: z.string(),
  mimetype: z.string().refine((mime) => mime.startsWith("image/"), {
    message: "O arquivo deve ser uma imagem.",
  }),
  size: z.number().max(MAX_FILE_SIZE, {
    message: "O tamanho da imagem não pode exceder 5MB.",
  }),
  fieldname: z.string(),
  encoding: z.string(),
});

const ProductSpecificationSchema = z.object({
  name: z.string({ required_error: msg.required }).min(2, msg.minLength(2)).max(25),
  value: z.string({ required_error: msg.required }).min(2, msg.minLength(2)),
});

const schema = {
  id: z.string().uuid().optional(),
  isActive: z.boolean().default(true),
  rating: z.number().min(0).max(5).default(0),
  specifications: z.array(ProductSpecificationSchema).optional().default([]),
  title: z.string({ required_error: msg.required }).min(5, msg.minLength(5)),
  description: z.string({ required_error: msg.required }).min(10, msg.minLength(10)),
  price: z.number({ required_error: msg.required }).nonnegative({ message: msg.negative }),
  discount: z.number({ required_error: msg.required }).int().min(0).max(100).default(0),
  stock: z.number({ required_error: msg.required }).int().nonnegative({ message: msg.negative }),
  slug: z.string({ required_error: msg.required }).regex(/^[a-z0-9-]+$/, msg.invalid),
  brandId: z.string({ required_error: msg.required }).uuid({ message: msg.invalidId }),
  categoryId: z.string({ required_error: msg.required }).uuid({ message: msg.invalidId }),
  images: z.array(FileSchema).max(5, { message: "Você pode enviar no máximo 5 imagens." }),
};

const create = (data) => {
  return z.object(schema).parse(data);
};

const update = (data) => {
  let result = z.object(schema).partial();
  result = result.refine((data) => Object.keys(data).length > 0, { message: msg.partial });
  return result.parse(data);
};

module.exports = { create, update };
