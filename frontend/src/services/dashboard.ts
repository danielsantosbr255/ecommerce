// src/services/dashboardService.ts
import api from "@/lib/axios";

export const DashboardService = {
  async getSummary(): Promise<DashboardSummary> {
    const response = await api.get("/dashboard/summary");
    return response.data;
  },

  async getRecentOrders(): Promise<Order[]> {
    const response = await api.get("/dashboard/recent-orders");
    return response.data;
  },

  async getSalesChartData(): Promise<SalesChartData[]> {
    const response = await api.get("/dashboard/sales-chart");
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
