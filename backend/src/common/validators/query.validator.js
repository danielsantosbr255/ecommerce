const { z } = require("zod");

const productQuerySchema = z.object({
  page: z.string().optional().transform(Number).optional(),
  limit: z.string().optional().transform(Number).optional(),
  search: z.string().optional(),
  categoryId: z.string().optional(),
  brandId: z.string().optional(),
  orderBy: z.enum(["price", "createdAt"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

const userQuerySchema = z.object({
  page: z.string().optional().transform(Number).optional(),
  limit: z.string().optional().transform(Number).optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  orderBy: z.enum(["name", "email", "createdAt"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

const brandQuerySchema = z.object({
  page: z.string().optional().transform(Number).optional(),
  limit: z.string().optional().transform(Number).optional(),
  search: z.string().optional(),
});

const products = (query) => {
  return productQuerySchema.parse(query);
};

const users = (query) => {
  return userQuerySchema.parse(query);
};

const brands = (query) => {
  return brandQuerySchema.parse(query);
};

module.exports = { products, users, brands };
