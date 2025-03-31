import Carousel from "@/components/carousel/Carousel";
import FeaturedCarousel from "@/components/carousel/CarouselLib";
import Product from "@/components/products/Product";
import { ProductType } from "@/types/ProductType";
import { ShoppingBag } from "lucide-react";

const getProducts = async () => {
    try {
        const products = await fetch("https://fakestoreapi.com/products");
        // const products = await fetch("http://localhost:3001/products");
        return products.json();
    } catch (error) {
        return [];
    }
};

export default async function Home() {
    const products = await getProducts();

    if (products.length === 0)
        return (
            <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0">
                <h1>Nenhum Produto Encontrado!</h1>
            </div>
        );

    return (
        <main className="bg-gray-200 flex flex-col gap-4 max-w-9/12 mx-auto pt-16 px-0 shadow-sm">
            <div className="bg-linear-to-r from-amber-500 to-yellow-500 flex flex-col gap-8 justify-center items-center pt-10 text-4xl font-bold text-center w-auto min-h-80 ">
                <ShoppingBag className="text-white m-0" size={70}/>
                <h1 className="text-white">
                    Confira os melhores produtos do mercado em um só lugar!
                </h1>
                <div className="flex justify-center gap-4 text-lg">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Ver todos
                    </button>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                        Comprar agora
                    </button>
                </div>
            </div>

            <Carousel products={products} />

            <h2 className="text-2xl text-amber-500 font-bold text-center mb-4">Produtos</h2>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7 px-4">
                {products.map((product: ProductType) => (
                    <Product key={product.id} product={product} />
                ))}
            </section>
        </main>
    );
}
