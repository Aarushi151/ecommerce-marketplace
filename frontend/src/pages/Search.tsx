import { useState } from "react";
import { searchProducts } from "../api/search";

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [categoryId, setCategoryId] = useState<number | undefined>();

  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      if (!keyword) {
        setError("Keyword is required");
        return;
      }

      const data = await searchProducts(
        keyword,
        minPrice,
        maxPrice,
        categoryId
      );

      setResults(data); // ✅ FIXED
      setError("");
    } catch (err: any) {
      console.log("SEARCH ERROR:", err.response?.data);

      const msg =
        err.response?.data?.detail ||
        err.message ||
        "Something went wrong";

      setError(msg);
      setResults([]);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Product Search
      </h1>

      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      <div className="grid grid-cols-4 gap-4 mb-6">
        <input
          placeholder="Keyword"
          className="border p-2"
          onChange={(e) => setKeyword(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min Price"
          className="border p-2"
          onChange={(e) => setMinPrice(Number(e.target.value))}
        />

        <input
          type="number"
          placeholder="Max Price"
          className="border p-2"
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />

        <input
          type="number"
          placeholder="Category ID"
          className="border p-2"
          onChange={(e) =>
            setCategoryId(Number(e.target.value))
          }
        />
      </div>

      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-6 py-2 mb-6"
      >
        Search
      </button>

      <div className="grid grid-cols-3 gap-6">
        {results.map((p) => (
          <div key={p.id} className="border p-4">
            <h2 className="font-bold">{p.name}</h2>
            <p>${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}