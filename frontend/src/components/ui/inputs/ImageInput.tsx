"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

type Props = {
  onChange: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
};

export default function ImageUpload({ onChange, maxFiles = 5, maxSizeMB = 5 }: Props) {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLLabelElement | HTMLLabelElement>(null);

  const updateFiles = useCallback(
    (files: File[]) => {
      setImages(files);
      setPreviews(files.map((file) => URL.createObjectURL(file)));
      onChange(files);
    },
    [onChange]
  );

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;

      const incomingFiles = Array.from(fileList)
        .filter((file) => file.type.startsWith("image/"))
        .filter((file) => file.size <= maxSizeMB * 1024 * 1024)
        .slice(0, maxFiles);

      updateFiles(incomingFiles);
    },
    [maxFiles, maxSizeMB, updateFiles]
  );

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleRemove = (index: number) => {
    const newFiles = [...images];
    newFiles.splice(index, 1);
    updateFiles(newFiles);
  };

  return (
    <div className="w-full">
      <label
        htmlFor="image-upload"
        ref={inputRef}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white hover:bg-gray-100"
        }`}
      >
        <span className="text-tx-primary">
          {isDragging ? "Solte as imagens aqui" : "Clique ou arraste imagens aqui"}
        </span>
      </label>

      <input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        // ref={inputRef}
        onChange={(e) => handleFiles(e.target.files)}
      />

      {previews.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-4">
          {previews.map((src, index) => (
            <div key={index} className="relative group aspect-square rounded-lg overflow-hidden shadow-xs">
              <Image src={src} alt={`preview-${index}`} fill className="object-cover w-full h-full" />

              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-1 right-1 bg-red-600 text-tx-on-primary rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition"
                title="Remover imagem"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
