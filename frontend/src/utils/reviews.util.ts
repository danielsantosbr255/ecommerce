type Review = {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  productId: string;
};

type FetchReviewResponse = {
  reviews: Review[];
};

type CreateReviewProps = {
  accessToken: string | null;
  productSlug: string;
  rating: number;
  comment: string;
};

class ReviewsUtil {
  static async fetchReviews(productSlug: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/product/${productSlug}`);
    const data: Review[] = await res.json();
    if (!res.ok) throw new Error("Falha ao obter reviews");
    return data;
  }

  static async fetchReview(id: string, reviewId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/reviews/${reviewId}`);
    const data = await res.json();
    if (!res.ok) throw new Error("Falha ao obter review");
    return data;
  }

  static async createReview({ accessToken, productSlug, rating, comment }: CreateReviewProps) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify({ productSlug, rating, comment }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error("Falha ao criar review");
    return data;
  }
}

export default ReviewsUtil;
