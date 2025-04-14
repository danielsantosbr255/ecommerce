"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { ProductType } from "@/types/ProductType";

type ProductImageProps = {
  product: ProductType;
  fill?: boolean;
  className?: string;
  alt?: string;
};

const PLACEHOLDER_IMAGE = "/placeholder.jpg";

const getValidImageUrl = (imagePath?: string): string => {
  if (imagePath?.startsWith("http")) return imagePath;
  if (!imagePath) return PLACEHOLDER_IMAGE;
  return `/${imagePath.replace(/^\/+/, "")}`;
};

export default function ProductImage({ product, fill = false, className }: ProductImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const imageUrl = error ? PLACEHOLDER_IMAGE : getValidImageUrl(product.image);
  const altText = product.title;

  const imageClasses = clsx(
    "object-cover transition-all duration-500 ease-in-out",
    loading ? "scale-100 blur-3xl grayscale" : "scale-95 blur-0 grayscale-0",
    className
  );

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  if (fill) {
    return (
      <Image
        src={imageUrl}
        fill
        alt={altText}
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={imageClasses}
        onLoad={handleLoad}
        onError={handleError}
      />
    );
  }

  return (
    <Image
      src={imageUrl}
      width={400}
      height={400}
      alt={altText}
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
      className={imageClasses}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
}
