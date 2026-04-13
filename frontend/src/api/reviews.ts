import api from "./axios";

interface ReviewPayload {
  product_id: number;
  rating: number;
  comment: string;
}

export const getReviews = async (productId: number) => {
  const res = await api.get(`/reviews/${productId}`);
  return res.data;
};

export const addReview = async (review: ReviewPayload) => {
  const res = await api.post("/reviews/reviews", review);
  return res.data;
};