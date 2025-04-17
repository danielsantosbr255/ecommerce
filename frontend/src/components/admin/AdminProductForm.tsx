import { ProductType } from "@/types/ProductType";
import Image from "next/image";
import React, { useState, useRef } from "react";

interface Props {
  onAddProduct: (productData: Omit<ProductType, "id" | "image">, imageFile: File | null) => void;
}

const AdminProductForm: React.FC<Props> = ({ onAddProduct }) => {
  const [newProduct, setNewProduct] = useState<Omit<ProductType, "id" | "image">>({
    title: "",
    price: 0,
    category: "",
    description: "",
    stock: 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreviewUrl(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const validateProduct = (
    product: Omit<ProductType, "id" | "image">,
    imageFile: File | null
  ): string | null => {
    if (!product.title.trim()) return "O nome do produto é obrigatório.";
    if (product.price <= 0) return "O preço deve ser maior que zero.";
    if (!product.category.trim()) return "A categoria é obrigatória.";
    if (product.stock < 0) return "O estoque não pode ser negativo.";
    if (!imageFile) return "A imagem do produto é obrigatória.";
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateProduct(newProduct, imageFile);
    if (validationError) {
      alert(validationError); // Use toast aqui se preferir no componente menor
      return;
    }

    setIsAdding(true);
    onAddProduct(newProduct, imageFile);
    setNewProduct({ title: "", price: 0, category: "", description: "", stock: 0 });
    setImageFile(null);
    setImagePreviewUrl(null);
    setIsAdding(false);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Adicionar Novo Produto</h3>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Nome:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newProduct.title}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
            Preço:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
            Categoria:
          </label>
          <select
            id="category"
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Selecione</option>
            <option value="Roupas">Roupas</option>
            <option value="Calçados">Calçados</option>
            <option value="Eletrônicos">Eletrônicos</option>
            <option value="Livros">Livros</option>
            <option value="Acessórios">Acessórios</option>
          </select>
        </div>
        <div>
          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
            Imagem:
          </label>
          {imagePreviewUrl && (
            <div className="mb-2 relative w-24 h-24 flex-shrink-0">
              <Image
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                src={imagePreviewUrl}
                alt="Prévia da Imagem"
                className="max-h-32 rounded-md"
              />
            </div>
          )}
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={triggerFileInput}
          >
            Selecionar Imagem
          </button>
        </div>
        <div className="col-span-full">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Descrição:
          </label>
          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="stock" className="block text-gray-700 text-sm font-bold mb-2">
            Estoque:
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="col-span-full">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isAdding}
            className={`bg-highlight-n hover:bg-highlight-h text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isAdding ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isAdding ? "Adicionando..." : "Adicionar Produto"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
