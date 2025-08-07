// /components/product/ProductImagesInput.tsx
import Image from "next/image";
import { DragEvent } from "react";

interface ProductImagesInputProps {
  images: (string | File)[];
  onAdd: (files: FileList | File[]) => void;
  onRemove: (index: number) => void;
  error?: string;
  maxImages?: number;
}

export function ProductImagesInput({ images, onAdd, onRemove, error, maxImages = 5 }: ProductImagesInputProps) {
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) onAdd(e.dataTransfer.files);
  };

  return (
    <div>
      <div
        className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50"
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
        <label htmlFor="images-input" className="block mt-2 text-blue-600 underline cursor-pointer">
          Selecionar imagens ({images.length}/{maxImages})
        </label>
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}

      {images.length > 0 && (
        <div className="flex gap-3 flex-wrap mt-2">
          {images.map((img, i) => (
            <div key={i} className="relative">
              <Image
                src={img instanceof File ? URL.createObjectURL(img) : img}
                alt="Preview"
                className="w-24 h-24 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
