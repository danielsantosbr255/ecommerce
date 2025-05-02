// src/types/CartType.ts
import { Product } from "./Product";

export type CartItem = {
  id: string;
  product: Product;
  quantity: number;
};
