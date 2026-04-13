import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { handleApiError } from "../api/axios";

export default function ProductReviews() {
  const { id } = useParams();
  const [reviews, setReviews] = useState<any[]>([]);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/reviews/${id}`
      );
      setReviews(res.data);
    } catch (err: any) {
      setError(handleApiError(err));
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold mb-4">Reviews</h1>

      {error && <p className="text-red-500">{error}</p>}

      {reviews.length === 0 && <p>No reviews yet</p>}

      {reviews.map((r, index) => (
        <div key={index} className="border p-3 mb-3">
          <p><strong>Rating:</strong> {r.rating}</p>
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  );
}