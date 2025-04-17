"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { ProductType } from "@/types/ProductType";

type ProductImageProps = {
  product: ProductType;
  fill?: boolean;
  alt?: string;
  className?: string;
  parentClassName?: string;
};

const PLACEHOLDER_IMAGE = "/placeholder.jpg";

const getValidImageUrl = (imagePath?: string): string => {
  if (imagePath?.startsWith("http")) return imagePath;
  if (!imagePath) return PLACEHOLDER_IMAGE;
  return `/${imagePath.replace(/^\/+/, "")}`;
};

export default function ProductImage({ product, className }: ProductImageProps) {
  const [error, setError] = useState(false);

  const imageUrl = error ? PLACEHOLDER_IMAGE : getValidImageUrl(product.images[0].url);
  const altText = product.title;

  const handleError = () => {
    setError(true);
  };

  return (
    <Image
      src={imageUrl}
      fill
      alt={altText}
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
      className={clsx("object-contain transition-all duration-500 ease-in-out", className)}
      onError={handleError}
      placeholder="blur"
      blurDataURL={PLACEHOLDER_IMAGE}
    />
  );
}
