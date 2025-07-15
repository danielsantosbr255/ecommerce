import { productService } from "@/services/products";
import AdminProductList from "../components/AdminProductList";
import Pagination from "@/components/ui/Pagination";
import SessionLabel from "@/components/ui/SessionLabel";
import { FaBox } from "react-icons/fa";

const page = async () => {
  const result = await productService.getAll();
  if (!result) return null;

  const { products, pagination } = result;
  const { currentPage, pageSize, totalPages } = pagination;

  return (
    <main className="flex flex-col w-full gap-4">
      <SessionLabel label="Produtos" icon={<FaBox size={25} />} />

      <AdminProductList products={products} />

      <Pagination currentPage={currentPage} totalPages={totalPages} path={"/admin/products"} pageSize={pageSize} />
    </main>
  );
};

export default page;
