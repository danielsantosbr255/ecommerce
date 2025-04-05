// "use client";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { ProductType } from "@/types/ProductType";
import DeleteButton from "@/components/buttons/DeleteButton";

async function getProducts(): Promise<ProductType[]> {
    const res = await fetch("http://localhost:3001/products", {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
}

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Produtos</h2>
                <Link
                    href="/admin/products/create"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    + Novo Produto
                </Link>
            </div>

            <div className="grid gap-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white p-4 rounded shadow flex justify-between items-center"
                    >
                        <div>
                            <h3 className="text-lg font-bold">{product.title}</h3>
                            <p>R$ {product.price}</p>
                            <p>Estoque: {product.stock}</p>
                        </div>
                        <div className="flex gap-2">
                            <Link
                                href={`/admin/products/edit/${product.id}`}
                                className="text-blue-600 hover:underline"
                            >
                                Editar
                            </Link>
                            <DeleteButton productId={product.id} />
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}
