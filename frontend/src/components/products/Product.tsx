import { ProductType } from "@/types/ProductType";
import ProductImage from "./ProductImage";
import { Menu, ShoppingCart, LogIn, UserPlus, User, FlameKindling, Network } from "lucide-react";

type ProductProps = {
    product: ProductType;
};

export default function Product({ product }: ProductProps) {
    return (
        <div className="w-full aspect-[3/3] flex flex-col bg-gray-50 text-black p-2 gap-4 border border-gray-300 rounded-md cursor-pointer hover:border-amber-500">
            <div className="relative w-full h-full scale-100">
                <ProductImage product={product} fill />
            </div>

            <div className="flex justify-between items-center font-bold my-3">
                <p className="text-sm text-center text-neutral-600 truncate">{product.title}</p>
            </div>

            <div className="flex flex-col font-bold my-2">
                <p className="text-lg text-amber-500">$ {product.price}</p>
                <p className="text-sm text-neutral-600">No pix</p>
            </div>

            {/* <button className="bg-amber-500 flex justify-center items-center gap-2 p-2 rounded-sm text-white text-sm font-bold text-center cursor-pointer">
                <ShoppingCart />
                Adicionar ao Carrinho
            </button> */}
        </div>
    );
}
