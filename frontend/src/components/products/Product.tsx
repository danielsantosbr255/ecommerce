import { ProductType } from "@/types/ProductType";
import ProductImage from "./ProductImage";
import { Menu, ShoppingCart } from "lucide-react";

type ProductProps = {
    product: ProductType;
};

export default function Product({ product }: ProductProps) {
    return (
        <div className="w-full aspect-[3/3] flex flex-col text-black gap-1 p-2 rounded-xl cursor-pointer hover:scale-105 hover:bg-gray-100 transition-all">
            <div className="relative w-full h-full scale-100 bg-gray-50 rounded-xl hover:border border-amber-500 shadow-md transition-all">
                <ProductImage product={product} fill />
            </div>

            <div className="flex justify-between items-center font-semibold my-1">
                <p className="text-md text-neutral-700 truncate">{product.title}</p>
            </div>
            <p className="text-sm text-neutral-600 truncate">{product.description}</p>

            <div className="flex flex-col font-bold my-0">
                <p className="text-lg text-amber-500">$ {product.price}</p>
                <p className="text-sm text-neutral-600">No pix</p>
            </div>

            <button className="bg-white hover:bg-amber-500 flex justify-center items-center py-2 pl-3 rounded-md text-amber-500 hover:text-white border border-amber-500 font-bold text-center cursor-pointer transition-all">
                <ShoppingCart size={20} className="" />
                <p className="scale-90">Adicionar ao Carrinho</p>
            </button>
        </div>
    );
}
