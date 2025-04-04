import React from "react";
import { ProductType } from "@/types/ProductType";
import Image from "next/image";

const getProducts = async () => {
    try {
        const products = await fetch("http://localhost:3001/products");
        return products.json();
    } catch (error) {
        return [];
    }
};

const getValidImageUrl = (imagePath: string) => {
    if (!imagePath) return "/placeholder.jpg";
    const baseUrl = "http://localhost:3001";
    return `${baseUrl}/${imagePath.replace(/^\/+/, "")}`;
};

export default async function Products() {
    const products = await getProducts();

    return (
        <div className="bg-gray-200 flex flex-col justify-center items-center mt-18 w-full h-full">
            <div className="bg-gray-100 flex flex-col justify-center items-center p-4 m-4 gap-4 rounded-lg shadow-sm max-w-2xl w-full">
                <h1 className="text-gray-500 text-2xl p-4 font-bold">Todos os Produtos</h1>
                {products.map((product: ProductType) => (
                    <div
                        key={product.id}
                        className="bg-white shadow-sm text-gray-600 rounded-lg p-4 flex flex-col gap-1 justify-center items-center w-full h-auto"
                    >
                        <h2 className="text-amber-500 font-bold text-xl pb-4">{product.title}</h2>

                        <div className="flex justify-between w-full px-4 gap-4">
                            <div className="flex flex-col w-full truncate">
                                <p className="truncate">
                                    <span className="font-bold">Descrição:</span>{" "}
                                    {product.description}
                                </p>
                                <p>
                                    <span className="font-bold">Estoque:</span> {product.stock}
                                </p>
                                <p>
                                    <span className="font-bold">Categoria:</span> {product.category}
                                </p>
                                <p>
                                    <span className="font-bold">Preço:</span> {product.price}
                                </p>
                            </div>
                            <div className="">
                                <Image
                                    src={getValidImageUrl(product.image)}
                                    alt={product.title}
                                    width={80}
                                    height={50}
                                    className="object-cover w-full rounded-md shadow-sm"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
