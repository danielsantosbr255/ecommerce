// src/types/CartType.ts
import { ProductType } from "./ProductType";

export type CartItem = {
  id: string;
  product: ProductType;
  quantity: number;
};
