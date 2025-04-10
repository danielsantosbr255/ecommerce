"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductsUtil from "@/utils/products.util";
import ProductImage from "@/components/products/ProductImage";
import { ProductType } from "@/types/ProductType";
import CurrencyUtil from "@/utils/currency.util";
import Product from "@/components/products/Product";

// Tipagens
type Review = {
    name: string;
    rating: number;
    comment: string;
};

const getValidImageUrl = (imagePath: string | null = null) => {
    if (!imagePath) return "http://localhost:3001/uploads/placeholder.png"; // Caso a URL seja undefined ou vazia

    const baseUrl = "http://localhost:3001";

    return `${baseUrl}/${imagePath.replace(/^\/+/, "")}`;
};

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductType | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newReview, setNewReview] = useState<Review>({
        name: "",
        rating: 5,
        comment: "",
    });
    const [products, setProducts] = useState<ProductType[]>([]);

    const relatedProducts = products
        .filter((p) => p.category === product?.category && p.id !== product?.id)
        .sort(() => Math.random() - 0.5) // embaralha os produtos
        .slice(0, 4); // pega os 4 primeiros do novo "shuffle"

    useEffect(() => {
        async function fetchProduct() {
            const product = await ProductsUtil.fetchProduct(id as string);
            setProduct(product);
        }

        async function fetchProducts() {
            const products = await ProductsUtil.fetchProducts();
            setProducts(products);
        }

        async function fetchReviews() {
            const data = await ProductsUtil.fetchReviews(id);
            setReviews(data);
        }

        if (id) {
            fetchProduct();
            fetchProducts();
            // fetchReviews();
        }
    }, [id]);

    const handleReviewSubmit = async () => {
        if (!newReview.name || !newReview.comment) return alert("Preencha todos os campos.");
        const res = await ProductsUtil.createReview(id, newReview);
        if (res.ok) {
            setReviews([...reviews, newReview]);
            setNewReview({ name: "", rating: 5, comment: "" });
        } else {
            alert("Erro ao enviar avaliação.");
        }
    };

    if (!product) return <div>Carregando...</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-16">
            {/* Produto */}
            <div className="grid md:grid-cols-2 gap-10">
                <div className="bg-white rounded shadow p-4">
                    <ProductImage
                        product={product}
                        className="w-full h-auto object-contain rounded"
                    />
                </div>
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold">{product.title}</h1>
                    <p className="text-xl text-amber-500 font-semibold">
                        {CurrencyUtil.formatCurrency(product.price)}
                    </p>
                    <p className="text-gray-600">Estoque: {product.stock}</p>
                    <p className="text-gray-700">{product.description || "Sem descrição."}</p>

                    <div className="flex gap-4 pt-4">
                        <button className="bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600">
                            Adicionar ao Carrinho
                        </button>
                        <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300">
                            Compartilhar
                        </button>
                    </div>
                </div>
            </div>

            {/* Especificações técnicas */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Especificações</h2>
                <div className="bg-white rounded shadow p-4">
                    <table className="w-full">
                        <tbody>
                            {product.specs?.length ? (
                                product.specs.map((spec, i) => (
                                    <tr key={i} className="border-b last:border-none">
                                        <td className="py-2 font-medium">{spec.key}</td>
                                        <td className="py-2 text-gray-600">{spec.value}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={2} className="text-gray-500 text-center py-4">
                                        Nenhuma especificação informada.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Avaliações */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Avaliações</h2>
                <div className="space-y-4">
                    {reviews.length > 0 ? (
                        reviews.map((review, i) => (
                            <div key={i} className="bg-gray-100 p-4 rounded">
                                <div className="flex items-center gap-2 font-semibold">
                                    {review.name}
                                    <div className="text-yellow-500">
                                        {"★".repeat(review.rating)}
                                        {"☆".repeat(5 - review.rating)}
                                    </div>
                                </div>
                                <p className="text-gray-700">{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-500 text-center">Nenhuma avaliação ainda.</div>
                    )}
                </div>

                {/* Adicionar nova avaliação */}
                <div className="mt-6 bg-white p-4 rounded shadow space-y-4">
                    <h3 className="text-xl font-bold">Deixe sua avaliação</h3>
                    <input
                        type="text"
                        placeholder="Seu nome"
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                        className="border rounded px-4 py-2 w-full"
                    />
                    <select
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: +e.target.value })}
                        className="border rounded px-4 py-2 w-full"
                    >
                        {[5, 4, 3, 2, 1].map((n) => (
                            <option key={n} value={n}>
                                {n} Estrela{n > 1 && "s"}
                            </option>
                        ))}
                    </select>
                    <textarea
                        placeholder="Comentário"
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        className="border rounded px-4 py-2 w-full h-24"
                    />
                    <button
                        onClick={handleReviewSubmit}
                        className="bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600"
                    >
                        Enviar Avaliação
                    </button>
                </div>
            </div>

            {/* Produtos relacionados */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Produtos Relacionados</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {relatedProducts.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
