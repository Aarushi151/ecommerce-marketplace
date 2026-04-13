import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addReview } from "../api/reviews";

export default function Review() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      if (!id) {
        setError("Invalid product ID");
        return;
      }

      if (rating < 1 || rating > 5) {
        setError("Rating must be between 1 and 5");
        return;
      }

      const payload = {
        product_id: Number(id),
        rating: Number(rating),
        comment: comment.trim(),
      };

      await addReview(payload);

      alert("✅ Review added successfully");

      navigate(`/products/${id}/reviews`);
    } catch (err: any) {
      const msg =
        err.response?.data?.[0]?.msg ||
        err.response?.data?.detail ||
        err.message ||
        "Something went wrong";

      setError(typeof msg === "string" ? msg : JSON.stringify(msg));
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold mb-4">Add Review</h1>

      {error && (
        <p className="text-red-500 mb-3">{error}</p>
      )}

      <label className="block mb-1">Rating (1-5)</label>
      <input
        type="number"
        min={1}
        max={5}
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border p-2 block mb-3"
      />

      <label className="block mb-1">Comment</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border p-2 block mb-3 w-full"
      />

      <button
        onClick={submit}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Submit Review
      </button>
    </div>
  );
}