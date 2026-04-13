import { useEffect, useState } from "react";
import { checkout, getOrders } from "../api/orders";
import { handleApiError } from "../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // load orders
  const loadOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
      setError("");
    } catch (err: any) {
      setError(handleApiError(err));
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // checkout
  const handleCheckout = async () => {
    try {
      const res = await checkout();
      setMessage(
        `Order placed! ID: ${res.order_id}, Total: $${res.total}`
      );
      setError("");
      loadOrders();
    } catch (err: any) {
      setError(handleApiError(err));
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {message && <p className="text-green-600 mb-4">{message}</p>}

      {/* ACTIONS */}
      <div className="flex gap-3 mb-6">

        <button
          onClick={handleCheckout}
          className="bg-green-500 text-white px-6 py-2"
        >
          Checkout Now
        </button>

        <button
          onClick={loadOrders}
          className="bg-blue-500 text-white px-6 py-2"
        >
          Refresh Orders
        </button>

      </div>

      {/* ORDERS LIST */}
      <div className="space-y-4">

        {orders.length === 0 && (
          <p className="text-gray-500">No orders yet</p>
        )}

        {orders.map((order: any) => (
          <div key={order.id} className="border p-4">

            <h2 className="font-bold">
              Order #{order.id}
            </h2>

            <p>Total: ${order.total_amount}</p>

            <p className="text-sm text-gray-500">
              Date: {new Date(order.created_at).toLocaleString()}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}