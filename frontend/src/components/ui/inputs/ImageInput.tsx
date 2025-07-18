"use client";

import Image from "next/image";
import { useCallback, useRef, useState, ChangeEvent, DragEvent, useEffect } from "react";
import { FaMinusCircle } from "react-icons/fa";

interface ImageUploadProps {
  onChange: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
}

const ImageUpload = ({ onChange, maxFiles = 5, maxSizeMB = 5 }: ImageUploadProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Effect to manage object URLs for previews
  useEffect(() => {
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(newPreviews);

    // Cleanup object URLs when component unmounts or selectedFiles change
    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedFiles]);

  /**
   * Updates the state with new files and notifies the parent component.
   * @param files The array of files to set.
   */
  const updateSelectedFiles = useCallback(
    (files: File[]) => {
      setSelectedFiles(files);
      onChange(files);
    },
    [onChange]
  );

  /**
   * Handles processing of incoming file lists (from input or drag-and-drop).
   * Filters by image type, size, and respects maxFiles limit.
   * @param fileList The FileList object from the event.
   */
  const processFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;

      const validFiles: File[] = Array.from(fileList).filter(
        (file) => file.type.startsWith("image/") && file.size <= maxSizeMB * 1024 * 1024
      );

      // Combine new files with existing ones, then slice to respect maxFiles
      // Filter out duplicates based on file name and size for robustness
      const combinedFiles = Array.from(
        new Map([...selectedFiles, ...validFiles].map((file) => [file.name + file.size, file])).values()
      ).slice(0, maxFiles);

      updateSelectedFiles(combinedFiles);
    },
    [maxFiles, maxSizeMB, selectedFiles, updateSelectedFiles]
  );

  /**
   * Handles file selection from the input element.
   * @param event The ChangeEvent from the input.
   */
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    processFiles(event.target.files);
    // Reset input value to allow selecting the same file again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /**
   * Handles the drop event for drag-and-drop functionality.
   * @param event The DragEvent from the drop area.
   */
  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    processFiles(event.dataTransfer.files);
  };

  /**
   * Handles removing an image from the selection.
   * @param index The index of the image to remove.
   */
  const handleRemoveImage = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    updateSelectedFiles(newFiles);
  };

  /**
   * Triggers the hidden file input click event when the label is clicked.
   * This is the primary mechanism for opening the file dialog.
   */
  const handleLabelClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      {/* O label não tem mais "htmlFor", o clique é gerenciado apenas pelo onClick */}
      <label
        onDragOver={(e: DragEvent<HTMLLabelElement>) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={handleLabelClick}
        className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition ${
          isDragging ? "border-tx-link bg-tx-link/10" : "border-gray-300 bg-white hover:bg-gray-100"
        }`}
      >
        <span className="text-tx-primary">{isDragging ? "Solte as imagens aqui" : "Clique ou arraste imagens aqui"}</span>
      </label>

      {/* Hidden file input: não está conectado ao label via htmlFor */}
      <input
        id="image-upload-input" // Mantém o ID por boa prática, mas não é usado pelo label
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {imagePreviews.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-4">
          {imagePreviews.map((src, index) => (
            <div key={src} className="relative group aspect-square rounded-lg overflow-hidden shadow border border-dotted border-lines/50">
              <Image
                src={src}
                alt={`Prévia da imagem ${index + 1}`}
                fill
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="bg-bg-secondary absolute top-1 right-1 rounded-full text-tx-error opacity-0 group-hover:opacity-100 transition cursor-pointer"
                title="Remover imagem"
              >
                <FaMinusCircle size={22} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
