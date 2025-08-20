"use client";

import { ProductImage } from "@/types";
import { useCallback, useState } from "react";

type ImageInput = File | ProductImage;

export function useImageUploader(initialImages: ImageInput[] = [], maxImages = 5) {
  const [images, setImages] = useState<ImageInput[]>(initialImages);

  const addImages = (files: FileList | File[]) => {
    const newFiles = Array.from(files);
    const updated = [...images, ...newFiles].slice(0, maxImages);
    setImages(updated);
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  const resetImages = useCallback((newImages: ImageInput[] = []) => {
    setImages(newImages);
  }, []);

  return { images, addImages, removeImage, resetImages };
}
