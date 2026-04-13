import { useState } from "react";
import { getRecommendations } from "../api/recommendations";
import { handleApiError } from "../api/axios";

export default function Recommendations() {
  const [userId, setUserId] = useState<number>(0);
  const [results, setResults] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFetch = async () => {
    if (!userId) {
      setError("Please enter user id");
      return;
    }

    try {
      const data = await getRecommendations(userId); // ✅ already res.data

      // ✅ FIX: correct usage
      setResults(data?.data || data);
      setMessage(data?.message || "");

      setError("");
    } catch (err: any) {
      setError(handleApiError(err));
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Recommendations
      </h1>

      {error && (
        <p className="text-red-500 mb-4">
          {error}
        </p>
      )}

      {message && (
        <p className="text-green-600 mb-4">
          {message}
        </p>
      )}

      {/* INPUT */}
      <div className="flex gap-4 mb-6">

        <input
          type="number"
          placeholder="User ID"
          value={userId || ""}
          onChange={(e) => setUserId(Number(e.target.value))}
          className="border p-2"
        />

        <button
          onClick={handleFetch}
          className="bg-blue-500 text-white px-4"
        >
          Get Recommendations
        </button>

      </div>

      {/* RESULTS */}
      <div className="grid grid-cols-3 gap-6">

        {results.length === 0 && (
          <p className="text-gray-500">
            No recommendations yet
          </p>
        )}

        {results.map((item, index) => (
          <div key={item.id || index} className="border p-4">

            <h2 className="font-bold">
              {item.name || "Product"}
            </h2>

            <p>${item.price}</p>

          </div>
        ))}

      </div>

    </div>
  );
}