import api from '../axios';
import { Product, Order, User, Review } from '@/types';

export const adminApi = {
  products: {
    getAll: async (): Promise<Product[]> => {
      const response = await api.get('/admin/products');
      return response.data;
    },
    create: async (productData: Omit<Product, 'id'>): Promise<Product> => {
      const response = await api.post('/admin/products', productData);
      return response.data;
    },
    update: async (id: string, productData: Partial<Product>): Promise<Product> => {
      const response = await api.put(`/admin/products/${id}`, productData);
      return response.data;
    },
    delete: async (id: string): Promise<void> => {
      await api.delete(`/admin/products/${id}`);
    }
  },
  
  orders: {
    getAll: async (): Promise<Order[]> => {
      const response = await api.get('/admin/orders');
      return response.data;
    },
    updateStatus: async (id: string, status: string): Promise<Order> => {
      const response = await api.patch(`/admin/orders/${id}/status`, { status });
      return response.data;
    },
    delete: async (id: string): Promise<void> => {
      await api.delete(`/admin/orders/${id}`);
    }
  },
  
  users: {
    getAll: async (): Promise<User[]> => {
      const response = await api.get('/admin/users');
      return response.data;
    },
    create: async (userData: Omit<User, 'id'>): Promise<User> => {
      const response = await api.post('/admin/users', userData);
      return response.data;
    },
    update: async (id: string, userData: Partial<User>): Promise<User> => {
      const response = await api.put(`/admin/users/${id}`, userData);
      return response.data;
    },
    delete: async (id: string): Promise<void> => {
      await api.delete(`/admin/users/${id}`);
    }
  },
  
  reviews: {
    getAll: async (): Promise<Review[]> => {
      const response = await api.get('/admin/reviews');
      return response.data;
    },
    update: async (id: string, reviewData: Partial<Review>): Promise<Review> => {
      const response = await api.put(`/admin/reviews/${id}`, reviewData);
      return response.data;
    },
    delete: async (id: string): Promise<void> => {
      await api.delete(`/admin/reviews/${id}`);
    }
  }
};