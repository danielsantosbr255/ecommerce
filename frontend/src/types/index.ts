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
  image?: string;
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
  title: string;
  slug: string;
  description: string;
  discount: number;
  image: string;
  startsAt: Date;
  endsAt: Date;
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;

  products: PromotionProduct[];
}

export interface PromotionProduct {
  id: string;
  promotionId: string;
  promotion: Promotion;
  productId: string;
  product: Product;
  createdAt: Date;
  updatedAt: Date;
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
  id: string;
  title: string;
  description: string;
  price: number;
  discount?: number;
  stock: number;
  rating?: number;
  isActive?: boolean;
  slug: string;

  brand: Brand;
  brandId: string;
  categoryId: string;
  category: Category;

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
  createdAt: Date;
  updatedAt: Date;
  totalPrice: number;
}

export interface User {
  id: string;
  name: string;
  email: string;

  password: string;
  phone?: string;
  role: "USER" | "ADMIN";

  image: string;
  createdAt: Date;

  orders: Order[];
  reviews: Review[];
  sessions: Session[];
  cart?: Cart;
  addresses: Address[];
}

export interface Address {
  id: string;
  label: string;
  street: string;
  number: string;
  complement: string;
  neighborhood?: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  isDefault: boolean;

  userId: string;
  user: User;

  createdAt: Date;
  updatedAt: Date;
}

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

  accessToken: string;
  refreshToken: string;

  userAgent: string;
  ipAddress: string;
  os: string;
  browser: string;
  device: string;
  location: string;
  isActive: boolean;

  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}
