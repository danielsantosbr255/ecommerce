import { useState, useEffect } from "react";
import { adminApi } from "@/lib/api/admin";
import { useAuth } from "@/contexts/AuthContext";

export function useAdminData() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    products: [],
    orders: [],
    users: [],
    reviews: [],
  });

  useEffect(() => {
    if (!user || user.role !== "ADMIN") return;

    const loadData = async () => {
      try {
        const [products, orders, users, reviews] = await Promise.all([
          adminApi.products.getAll(),
          adminApi.orders.getAll(),
          adminApi.users.getAll(),
          adminApi.reviews.getAll(),
        ]);

        setData({ products, orders, users, reviews });
      } catch (error) {
        console.error("Failed to load admin data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user]);

  // Operações CRUD para Admin
  const deleteProduct = async (productId: string) => {
    await adminApi.products.delete(productId);
    setData((prev) => ({
      ...prev,
      products: prev.products.filter((p: any) => p.id !== productId),
    }));
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    const updatedOrder = await adminApi.orders.updateStatus(orderId, status);
    setData((prev) => ({
      ...prev,
      orders: prev.orders.map((o: any) => (o.id === orderId ? updatedOrder : o)),
    }));
  };

  // ... outras operações administrativas

  return {
    ...data,
    isLoading,
    deleteProduct,
    updateOrderStatus,
    // ... outras ações
  };
}
