export type ProductType = {
    id: string;
    title: string
    price: number;
    image: string;
    stock: number;
    category: string;
    description: string;
    specs?: { key: string; value: string }[];
};
