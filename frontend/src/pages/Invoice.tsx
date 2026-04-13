import { useState } from "react";
import { getInvoice } from "../api/invoices";
import { handleApiError } from "../api/axios";

export default function Invoice() {
  const [orderId, setOrderId] = useState<number>(0);
  const [invoice, setInvoice] = useState<any>(null);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    try {
      const data = await getInvoice(orderId);
      setInvoice(data);
      setError("");
    } catch (err: any) {
      setError(handleApiError(err));
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Invoice Lookup
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* INPUT */}
      <div className="flex gap-3 mb-6">

        <input
          type="number"
          placeholder="Enter Order ID"
          className="border p-2"
          onChange={(e) => setOrderId(Number(e.target.value))}
        />

        <button
          onClick={handleFetch}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Get Invoice
        </button>

      </div>

      {/* INVOICE */}
      {invoice && (
        <div className="border p-6 max-w-md">

          <h2 className="text-xl font-bold mb-2">
            Invoice #{invoice.id}
          </h2>

          <p><b>Order ID:</b> {invoice.order_id}</p>
          <p><b>Total:</b> ${invoice.total_amount}</p>

        </div>
      )}

    </div>
  );
}