import AdminLayout from "@/components/admin/AdminLayout";
import ProductForm from "@/components/forms/ProductForm";

export default function CreateProductPage() {
    return (
        <AdminLayout>
            <h2 className="text-2xl font-semibold mb-4">Criar Produto</h2>
            <ProductForm />
        </AdminLayout>
    );
}
