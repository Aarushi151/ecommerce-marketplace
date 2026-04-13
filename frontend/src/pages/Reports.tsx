import { useState } from "react";
import { getSalesReport, getTopProducts } from "../api/reports";

export default function Reports() {

  const [sales, setSales] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const loadSales = async () => {
    try {
      const res = await getSalesReport(1);
      setSales(res.data);   // ✅ FIX HERE
      setProducts([]);
    } catch (err) {
      console.log(err);
    }
  };

  const loadTopProducts = async () => {
    try {
      const res = await getTopProducts();
      setProducts(res.data);  // ✅ FIX HERE
      setSales([]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Reports
      </h1>

      <div className="flex gap-4 mb-6">

        <button
          onClick={loadSales}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sales Report
        </button>

        <button
          onClick={loadTopProducts}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Top Products
        </button>

      </div>

      {/* SALES REPORT TABLE */}

      {sales.length > 0 && (
        <table className="border w-full mb-10">

          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">User ID</th>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Total Amount</th>
              <th className="border p-2">Items</th>
              <th className="border p-2">Created</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((s) => (
              <tr key={s.order_id}>
                <td className="border p-2">{s.order_id}</td>
                <td className="border p-2">{s.user_id}</td>
                <td className="border p-2">{s.customer_name}</td>
                <td className="border p-2">{s.total_amount}</td>
                <td className="border p-2">{s.total_items}</td>
                <td className="border p-2">{s.created_at}</td>
              </tr>
            ))}
          </tbody>

        </table>
      )}

      {/* TOP PRODUCTS TABLE */}

      {products.length > 0 && (
        <table className="border w-full">

          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Rank</th>
              <th className="border p-2">Product ID</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Sold</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.product_id}>
                <td className="border p-2">{p.rank_position}</td>
                <td className="border p-2">{p.product_id}</td>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">{p.total_sold}</td>
              </tr>
            ))}
          </tbody>

        </table>
      )}

    </div>
  );
}