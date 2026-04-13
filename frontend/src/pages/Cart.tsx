import { useEffect, useState } from "react";
import {
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../api/cart";
import { handleApiError } from "../api/axios";

export default function Cart() {
  const [cart, setCart] = useState<any>({ items: [], total: 0 });
  const [error, setError] = useState("");

  const loadCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
      setError("");
    } catch (err: any) {
      setError(handleApiError(err));
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = async (id: number) => {
    try {
      await removeCartItem(id);
      loadCart();
    } catch (err: any) {
      setError(handleApiError(err));
    }
  };

  const handleUpdate = async (id: number, qty: number) => {
    try {
      await updateCartItem(id, { quantity: qty });
      loadCart();
    } catch (err: any) {
      setError(handleApiError(err));
    }
  };

  const handleClear = async () => {
    try {
      await clearCart();
      setCart({ items: [], total: 0 });
    } catch (err: any) {
      setError(handleApiError(err));
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-4">
        My Cart
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* TOP BAR */}
      <div className="flex gap-3 mb-6">

        <button
          onClick={loadCart}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Refresh
        </button>

        <button
          onClick={handleClear}
          className="bg-red-500 text-white px-4 py-2"
        >
          Clear Cart
        </button>

        <div className="ml-auto font-bold text-xl">
          Total: ${cart.total}
        </div>

      </div>

      {/* ITEMS */}
      <div className="space-y-4">

        {cart.items?.length === 0 && (
          <p className="text-gray-500">Cart is empty</p>
        )}

        {cart.items?.map((item: any) => (
          <div
            key={item.id}
            className="border p-4 flex justify-between items-center"
          >

            {/* PRODUCT INFO */}
            <div>
              <h2 className="font-bold">
                {item.product?.name || "Product"}
              </h2>

              <p>Price: ${item.product?.price}</p>
              <p>Subtotal: ${item.product?.price * item.quantity}</p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 items-center">

              <input
                type="number"
                value={item.quantity}
                min={1}
                className="border p-1 w-16"
                onChange={(e) =>
                  handleUpdate(item.id, Number(e.target.value))
                }
              />

              <button
                onClick={() => handleRemove(item.id)}
                className="bg-red-500 text-white px-3 py-1"
              >
                Remove
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}