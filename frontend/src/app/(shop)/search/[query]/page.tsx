"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { NextPage } from "next";
import { ProductType } from "@/types/ProductType";
import ProductsUtil from "@/utils/products.util";
import Product from "@/components/products/Product";

const SearchResultsPage: NextPage = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query && typeof query === "string") {
      setLoading(true);

      ProductsUtil.fetchProductByQuery(query)
        .then((data: ProductType[]) => {
          setSearchResults(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erro ao buscar produtos:", error);
          setError((error as Error).message);
          setLoading(false);
        });
    } else {
      setSearchResults([]);
      setLoading(false);
    }
  }, [query]);

  if (loading) {
    return <p>Carregando resultados para: {query}...</p>;
  }

  if (error) {
    return <p>Erro ao buscar produtos: {error}</p>;
  }

  return (
    <div>
      {searchResults.length > 0 ? (
        <section className="flex flex-col gap-4 lg:max-w-10/12 mx-auto px-0 mb-10">
          <h2 className="border-b border-gray-200 text-2xl text-gray-800 font-bold my-2 py-2">
            Resultados da Busca por: {query}
          </h2>
          <div className="grid grid-cols-1 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7 xl:px-0">
            {searchResults.map((product: ProductType) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </section>
      ) : (
        <div className="flex flex-col justify-center items-center mt-10">
          <h1 className="text-2xl text-gray-800 font-bold my-2 py-2">
            Nenhum produto encontrado para {query}.
          </h1>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
