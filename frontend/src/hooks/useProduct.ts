import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService, ProductResponse, QueryParams } from "@/services/products";
import { Product } from "@/types";

export const PRODUCT_QUERY_KEYS = {
  all: ["products"] as const,
  lists: () => [...PRODUCT_QUERY_KEYS.all, "list"] as const,
  list: (params: QueryParams) => [...PRODUCT_QUERY_KEYS.lists(), params] as const,
  details: () => [...PRODUCT_QUERY_KEYS.all, "detail"] as const,
  detail: (slug: string) => [...PRODUCT_QUERY_KEYS.details(), slug] as const,
  related: (productId: string) => [...PRODUCT_QUERY_KEYS.all, "related", productId] as const,
};

export function useProducts() {
  const queryClient = useQueryClient();

  const useGetAll = () => {
    return useQuery<ProductResponse | null, Error>({
      queryKey: PRODUCT_QUERY_KEYS.all,
      queryFn: () => productService.getAll(),
      staleTime: 1000 * 60 * 5,
    });
  };

  const useGetBySlug = (slug: string) => {
    return useQuery<Product | null, Error>({
      queryKey: PRODUCT_QUERY_KEYS.detail(slug),
      queryFn: () => productService.getBySlug(slug),
      enabled: !!slug,
      staleTime: 1000 * 60 * 5,
    });
  };

  const useGetByQuery = (params: QueryParams) => {
    return useQuery<ProductResponse | null, Error>({
      queryKey: PRODUCT_QUERY_KEYS.list(params),
      queryFn: () => productService.getByQuery(params),
      staleTime: 1000 * 60 * 5,
      placeholderData: (previousData) => previousData,
    });
  };

  const useGetRelated = (productId: string) => {
    return useQuery<Product[] | null, Error>({
      queryKey: PRODUCT_QUERY_KEYS.related(productId),
      queryFn: () => productService.getRelated(productId),
      enabled: !!productId,
      staleTime: 1000 * 60 * 5,
    });
  };

  const useCreate = () => {
    return useMutation<Product | null, Error, Omit<Product, "id">>({
      mutationFn: (productData) => productService.create(productData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.lists() });
      },
      onError: (error) => {
        console.error("Erro ao criar produto:", error);
      },
    });
  };

  const useUpdate = () => {
    return useMutation<Product | null, Error, { id: string; productData: Partial<Product> }>({
      mutationFn: ({ id, productData }) => productService.update(id, productData),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.detail(variables.id) });
        queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.lists() });
      },
      onError: (error) => {
        console.error("Erro ao atualizar produto:", error);
      },
    });
  };

  const useDelete = () => {
    return useMutation<unknown, Error, string>({
      mutationFn: (id) => productService.delete(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.lists() });
      },
      onError: (error) => {
        console.error("Erro ao deletar produto:", error);
      },
    });
  };

  return {
    useGetAll,
    useGetBySlug,
    useGetByQuery,
    useGetRelated,

    useCreate,
    useUpdate,
    useDelete,
  };
}
