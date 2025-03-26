import Product from "@/components/Product";
import { ProductType } from "@/types/ProductType";

const getProducts = async () => {
    try {
        const products = await fetch('https://fakestoreapi.com/products')
        // const products = await fetch("http://localhost:3001/products");
        return products.json();
    } catch (error) {
        return [];
    }
};

export default async function Home() {
    const products = await getProducts();

    return (
        <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0">
            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
                    {products.map((product: ProductType) => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <h1>Nenhum Produto Encontrado!</h1>
            )}
        </div>
    );
}
