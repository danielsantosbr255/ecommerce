type ProductImage = {
  id: string;
  url: string;
  alt?: string;
};

type Brand = {
  id: string;
  name: string;
  slug: string;
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Review = {
  id: string;
  rating: number;
  comment: string;
  userId: string;
};

type Promotion = {
  id: string;
  name: string;
  discount: number;
  startDate: Date;
  endDate: Date;
};

type ProductVariant = {
  id: string;
  color: string;
  size: string;
  stock: number;
  price: number;
  discount: number;
};

type ProductSpecification = {
  id: string;
  name: string;
  value: string;
};

// Adicione mais tipos conforme necessário
export type ProductType = {
  // Campos básicos
  id: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  rating: number;
  isActive: boolean;
  slug: string;

  //: Relacionamentos
  brandId: string;
  brand: Brand;

  categoryId: string;
  category: Category;

  //: Relacionamentos
  reviews: Review[];
  images: ProductImage[];
  promotions: Promotion[];
  variants: ProductVariant[];
  specifications: ProductSpecification[];
};
