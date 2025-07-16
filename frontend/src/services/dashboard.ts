import { api } from "@/lib/api";

export const DashboardService = {
  async getSummary() {
    const response = await api.get<DashboardSummary>("/dashboard/summary");
    return response.data;
  },

  async getRecentOrders() {
    const response = await api.get<Order[]>("/dashboard/recent-orders");
    return response.data;
  },

  async getSalesChartData() {
    const response = await api.get<SalesChartData[]>("/dashboard/sales-chart");
    return response.data;
  },
};

// Tipos
export interface DashboardSummary {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  monthlyGrowth: number;
}

export interface Order {
  id: string;
  customerName: string;
  amount: number;
  status: string;
  date: string;
}

export interface SalesChartData {
  date: string;
  sales: number;
}
