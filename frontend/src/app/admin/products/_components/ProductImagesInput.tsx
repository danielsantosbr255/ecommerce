import { DragEvent } from "react";
import { ProductImage } from "@/types";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import ErrorMessage from "@/components/ui/ErrorMessage";

type ImageInput = File | ProductImage | string;

interface ProductImagesInputProps {
  images: ImageInput[];
  onAdd: (files: FileList | File[]) => void;
  onRemove: (index: number) => void;
  error?: string;
  maxImages?: number;
  className?: string;
}

export function ProductImagesInput({ images, onAdd, onRemove, error, maxImages = 5, className }: ProductImagesInputProps) {
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) onAdd(e.dataTransfer.files);
  };

  const getImageSrc = (img: ImageInput): string => {
    if (img instanceof File) return URL.createObjectURL(img);
    if (typeof img === "string") return img;
    return img.url; // ProductImage
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div
        className={`border-2 border-dashed border-lines rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <p className="text-gray-500">Arraste e solte imagens aqui ou clique para selecionar</p>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => e.target.files && onAdd(e.target.files)}
          className="hidden"
          id="images-input"
        />
        <label htmlFor="images-input" className="block mt-2 text-primary underline cursor-pointer">
          Selecionar imagens ({images.length}/{maxImages})
        </label>
      </div>
      {error && <ErrorMessage message={error} />}

      {images.length > 0 && (
        <div className="flex gap-3 flex-wrap mt-3">
          {images.map((img, i) => (
            <div key={i} className="relative rounded-lg border border-lines/50">
              <Image src={getImageSrc(img)} width={96} height={96} alt="Preview" priority className="w-24 h-24 object-contain" />
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="absolute -top-2 -right-2 bg-tx-error text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-red-600"
              >
                <FaTrashAlt size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
