import { api } from "@/lib/api";
import { Address } from "@/types";

class AddressService {
  public async create(addressData: Omit<Address, "id">) {
    try {
      const response = await api.post("/addresses", addressData);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getAll() {
    try {
      const response = await api.get<Address[]>("/addresses", {
        cache: "force-cache",
        next: { revalidate: 60 },
      });
      return response.data;
    } catch {
      return [];
    }
  }

  public async getOne(id: string) {
    try {
      const response = await api.get(`/addresses/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async update(id: string, addressData: Partial<Address>) {
    try {
      const response = await api.put(`/addresses/${id}`, addressData);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async delete(id: string) {
    try {
      const response = await api.delete(`/addresses/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const addressService = new AddressService();
