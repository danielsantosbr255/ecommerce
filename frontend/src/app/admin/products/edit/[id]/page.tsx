import AdminLayout from "@/components/admin/AdminLayout";
import ProductForm from "@/components/forms/ProductForm";

type Product = {
    id: string;
    title: string;
    description: string;
    price: number;
    stock: number;
};

async function getProduct(id: string): Promise<Product> {
    const res = await fetch(`http://localhost:3001/products/${id}`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Produto não encontrado");
    return res.json();
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const product = await getProduct(params.id);

    return (
        <AdminLayout>
            <h2 className="text-2xl font-semibold mb-4">Editar Produto</h2>
            <ProductForm initialData={product} />
        </AdminLayout>
    );
}
