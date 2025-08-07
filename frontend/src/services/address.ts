import { api } from "@/lib/api";
import { AddressResponse } from "@/types";
import { Address } from "@/lib/schemas/address.schema";

class AddressService {
  public async create(addressData: Address) {
    const response = await api.post<AddressResponse>("/addresses", addressData);
    return response.data;
  }

  public async getAll() {
    try {
      const response = await api.get<AddressResponse[]>("/addresses");
      return response.data || [];
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
    const response = await api.put<AddressResponse>(`/addresses/${id}`, addressData);
    return response.data;
  }

  public async delete(id: string) {
    const response = await api.delete(`/addresses/${id}`);
    return response.data;
  }
}

export const addressService = new AddressService();
