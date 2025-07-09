import AdminProductCard from "./AdminProductCard";
import { productService } from "@/services/products";

const AdminProductList = async () => {
  const result = await productService.getAll();
  if (!result) return null;
  
  

  const { products } = result;

  if (!products || !products.length) {
    return <p className="text-tx-primary col-span-full">Nenhum produto encontrado.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {products.map((product) => (
        <AdminProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default AdminProductList;
