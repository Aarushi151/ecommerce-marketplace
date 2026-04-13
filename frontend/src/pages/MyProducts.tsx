import { useEffect, useState } from "react";
import { getMyProducts, deleteProduct } from "../api/products";
import { useNavigate } from "react-router-dom";
import { handleApiError } from "../api/axios";

export default function MyProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const load = async () => {
    try {
      const data = await getMyProducts();
      setProducts(data);
    } catch (err: any) {
      setError(handleApiError(err));
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      load();
    } catch (err: any) {
      setError(handleApiError(err));
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">My Products</h1>

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={() => navigate("/create-product")}
        className="bg-green-500 text-white px-4 py-2 mb-4"
      >
        + Create Product
      </button>

      {products.map((p) => (
        <div key={p.id} className="border p-4 mb-3">
          <h2 className="font-bold">{p.name}</h2>
          <p>${p.price}</p>

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => navigate(`/edit/${p.id}`)}
              className="bg-yellow-500 px-3 py-1"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(p.id)}
              className="bg-red-500 text-white px-3 py-1"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}