import ProductImage from "@/components/products/ProductImage";
import CurrencyUtil from "@/utils/currency.util";
import { Product } from "@/types";

const AdminProductList = async ({ products }: { products: Product[] }) => {
  if (!products || !products.length) {
    return <p className="col-span-full">Nenhum produto encontrado.</p>;
  }

  return (
    <table className="min-w-full divide-y divide-lines rounded-xl overflow-hidden shadow-xs">
      <thead className="bg-gray-200 font-bold text-sm">
        <tr>
          <th scope="col" className="px-6 py-3 text-left tracking-wider">
            Imagem
          </th>
          <th scope="col" className="py-3 text-left tracking-wider">
            ID
          </th>
          <th scope="col" className="px-6 py-3 text-left tracking-wider">
            Nome
          </th>
          <th scope="col" className="px-6 py-3 text-left tracking-wider">
            Categoria
          </th>
          <th scope="col" className="px-6 py-3 text-center tracking-wider">
            Estoque
          </th>
          <th scope="col" className="px-6 py-3 text-center tracking-wider">
            Valor
          </th>
          <th scope="col" className="px-6 py-3 text-right tracking-wider">
            Criado em
          </th>
        </tr>
      </thead>

      <tbody className="bg-bg-secondary divide-y divide-lines">
        {products.map((product) => (
          <tr key={product.id}>
            <td className="whitespace-nowrap">
              <div className="aspect-video">
                <ProductImage product={product} />
              </div>
            </td>
            <td className="py-4 whitespace-nowrap text-sm">
              <div className="font-semibold">{product.id}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="max-w-[300px] overflow-hidden text-ellipsis">{product.title}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="">{product.category.name}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center">
              <div className="">{product.stock || "-"}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center">
              <div className="text-start">{CurrencyUtil.formatCurrency(product.price)}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              <div className="">{new Date(product.createdAt).toLocaleString()}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminProductList;
