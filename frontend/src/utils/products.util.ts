const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

class ProductsUtil {
    static async createProduct(token: any, product: any) {
        const res = await fetch(`${API_URL}/products`, {
            method: "POST",
            body: product,
            headers: { Authorization: `Bearer ${token}` },
            credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error("Falha ao criar produto");
        return data;
    }

    static async updateProduct(id: string, product: any) {
        const res = await fetch(`${API_URL}/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(product),
        });
        const data = await res.json();
        if (!res.ok) throw new Error("Falha ao atualizar produto");
        return data;
    }

    static async deleteProduct(token: any, id: string) {
        const res = await fetch(`${API_URL}/products/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error("Falha ao deletar produto");
        return data;
    }

    static async fetchProducts() {
        const res = await fetch(`${API_URL}/products`);
        const data = await res.json();
        if (!res.ok) throw new Error("Falha ao obter produtos");
        return data;
    }

    static async fetchProduct(id: string) {
        const res = await fetch(`${API_URL}/products/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error("Falha ao obter produto");
        return data;
    }

    static async fetchProductsByCategory(category: string) {
        const res = await fetch(`${API_URL}/products/category/${category}`);
        const data = await res.json();
        if (!res.ok) throw new Error("Falha ao obter produtos por categoria");
        return data;
    }

    static async fetchProductsBySearch(search: string) {
        const res = await fetch(`${API_URL}/products/search/${search}`);
        const data = await res.json();
        if (!res.ok) throw new Error("Falha ao obter produtos por pesquisa");
        return data;
    }

    static async fetchReviews(id: any) {
        const res = await fetch(`${API_URL}/products/${id}/reviews`);
        const data = await res.json();
        if (!res.ok) throw new Error("Falha ao obter reviews");
        return data;
    }

    static async fetchReview(id: any, reviewId: any) {
        const res = await fetch(`${API_URL}/products/${id}/reviews/${reviewId}`);
        const data = await res.json();
        if (!res.ok) throw new Error("Falha ao obter review");
        return data;
    }

    static async createReview(id: any, review: any) {
        const res = await fetch(`${API_URL}/products/${id}/reviews`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(review),
        });
        const data = await res.json();
        if (!res.ok) throw new Error("Falha ao criar review");
        return data;
    }
}

export default ProductsUtil;
