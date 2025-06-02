export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
}

export interface CartItem {
  id: string;
  userId?: string;
  product: Product;
  productId: string;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  productSlug: string;
}

export interface Promotion {
  id: string;
  name: string;
  discount: number;
  startDate: Date;
  endDate: Date;
}

export interface ProductVariant {
  id: string;
  color: string;
  size: string;
  stock: number;
  price: number;
  discount: number;
}

export interface ProductSpecification {
  id: string;
  name: string;
  value: string;
}

export interface Product {
  // Campos básicos
  id: string;
  title: string;
  description: string;
  price: number;
  discount?: number;
  stock: number;
  rating?: number;
  isActive?: boolean;
  slug: string;

  //: Relacionamentos
  brand: Brand;
  brandId: string;
  categoryId: string;
  category: Category;

  //: Relacionamentos
  reviews?: Review[];
  images: ProductImage[];
  promotions?: Promotion[];
  variants?: ProductVariant[];
  specifications?: ProductSpecification[];
}

export interface Order {
  id: string;
  userId: string;
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  // outros campos
}

// User
export interface User {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
  // outros campos
}

// Auth
export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export interface Session {
  id: string;
  userId: string;
  expiresAt: string;
  userAgent: string;
  ipAddress: string;
  accessToken: string;
  refreshToken: string;
}
