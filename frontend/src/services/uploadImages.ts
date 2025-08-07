import { api } from "@/lib/api";
import { ProductImage } from "@/types";

export const uploadImages = async (files: File[] | File, folder: string, maxImages = 5) => {
  const isSingle = files instanceof File;
  const formData = new FormData();

  if (isSingle) {
    formData.append("file", files);
  } else {
    files.forEach((file) => formData.append("files", file));
  }

  formData.append("folder", folder);
  formData.append("maxImages", maxImages.toString());

  try {
    const res = await api.post<ProductImage[]>(`/uploads?single=${isSingle}`, formData);
    if (res.data) return res.data as ProductImage[];
  } catch (error) {
    throw error;
  }
};
