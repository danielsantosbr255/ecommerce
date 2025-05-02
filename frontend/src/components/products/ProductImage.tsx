"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Product } from "@/types";
import { LoaderCircle } from "lucide-react";
import LoadingState from "../LoadingState";

type ProductImageProps = {
  product: Product;
  fill?: boolean;
  alt?: string;
  className?: string;
  parentClassName?: string;
};

const PLACEHOLDER_IMAGE = "/placeholder.jpg";

const getValidImageUrl = (imagePath?: string): string => {
  if (!imagePath) return PLACEHOLDER_IMAGE;
  if (imagePath.startsWith("http")) return imagePath;
  return `/${imagePath.replace(/^\/+/, "")}`;
};

export default function ProductImage({ product, alt, className, parentClassName }: ProductImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const mainImageUrl = getValidImageUrl(product.images?.[0]?.url);
  const imageUrl = error ? PLACEHOLDER_IMAGE : mainImageUrl;
  const altText = alt || product.title || "Imagem do produto";

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className={clsx("relative w-full h-full", parentClassName)}>
      {loading && (
        <div className="absolute text-primary inset-0 flex items-center animate-spin justify-center">
          <LoadingState />
        </div>
      )}

      <Image
        src={imageUrl}
        alt={altText}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
        onError={handleError}
        onLoad={handleLoad}
        priority
        className={clsx(
          "object-contain transition-all duration-500 ease-in-out",
          loading && "opacity-0",
          className
        )}
        fill
      />
    </div>
  );
}
