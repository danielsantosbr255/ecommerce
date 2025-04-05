// import Carousel from "@/components/carousel/Carousel";
import Carousel from "@/components/carousel/Carousel";
import Product from "@/components/products/Product";
import { ProductType } from "@/types/ProductType";
import { Crown, ShoppingBag, CircleArrowDown } from "lucide-react";

const getProducts = async () => {
    try {
        // const products = await fetch("https://fakestoreapi.com/products");
        const products = await fetch("http://localhost:3001/products");
        return products.json();
    } catch (error) {
        return [];
    }
};

export default async function Home() {
    const products = await getProducts();

    if (products.length === 0)
        return (
            <main className="bg-gray-200 flex flex-col justify-center items-center gap-4 mx-auto pt-16 px-0 h-screen">
                <h1 className="font-bold text-gray-600 text-2xl">Nenhum Produto Encontrado!</h1>
            </main>
        );

    return (
        <main className="flex flex-col gap-6 items-center">
            <div className="bg-linear-to-r from-neutral-800 to-gray-500 flex flex-col gap-8 w-full justify-center items-center pt-10 text-4xl font-bold text-center min-h-150 shadow-md">
                <ShoppingBag className="text-white m-0" size={70} />
                <h1 className="text-white">
                    Confira os melhores produtos do mercado em um só lugar!
                </h1>
                <CircleArrowDown className="text-amber-500 scale-200 animate-bounce"/>
            </div>

            <div className="bg-gray-600/10 w-full max-w-10/12 shadow-lg rounded-xl h-auto flex flex-col items-center justify-center pb-8">
                <h1 className="text-amber-500 text-2xl font-bold py-4 flex gap-4 justify-center items-center">
                    <Crown className="scale-150"/> Destaques 
                </h1>
                <div className=" w-full max-w-10/12 h-auto">
                    <Carousel products={products} />
                </div>
            </div>

            <section className="flex flex-col gap-4 lg:max-w-10/12 mx-auto px-0 mb-10">
                <h2 className="border-b border-gray-200 text-2xl text-gray-800 font-bold my-2 py-2">
                    Produtos
                </h2>
                <div className="grid grid-cols-1 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7 xl:px-0">
                    {products.map((product: ProductType) => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </main>
    );
}
