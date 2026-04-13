import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct, updateProduct } from "../api/products";
import { handleApiError } from "../api/axios";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<any>({
    name: "",
    description: "",
    price: "",
  });

  const [error, setError] = useState("");

  const load = async () => {
    try {
      const data = await getProduct(Number(id));
      setForm(data);
    } catch (err: any) {
      setError(handleApiError(err));
    }
  };

  const handleUpdate = async () => {
    try {
      await updateProduct(Number(id), {
        ...form,
        price: Number(form.price),
      });
      navigate("/my-products");
    } catch (err: any) {
      setError(handleApiError(err));
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold mb-4">Edit Product</h1>

      {error && <p className="text-red-500">{error}</p>}

      <input
        value={form.name}
        className="border p-2 block mb-2"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        value={form.description}
        className="border p-2 block mb-2"
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <input
        value={form.price}
        type="number"
        className="border p-2 block mb-2"
        onChange={(e) =>
          setForm({ ...form, price: e.target.value })
        }
      />

      <button
        onClick={handleUpdate}
        className="bg-green-500 text-white px-4 py-2"
      >
        Update
      </button>
    </div>
  );
}