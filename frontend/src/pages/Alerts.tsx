import { useEffect, useState } from "react";
import { getAlerts } from "../api/alerts";
import { handleApiError } from "../api/axios";

export default function Alerts() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [error, setError] = useState("");

  const loadAlerts = async () => {
    try {
      const data = await getAlerts();
      setAlerts(data);
      setError("");
    } catch (err: any) {
      setError(handleApiError(err));
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        System Alerts (Admin Only)
      </h1>

      {error && (
        <p className="text-red-500 mb-4">
          {error}
        </p>
      )}

      <button
        onClick={loadAlerts}
        className="bg-blue-500 text-white px-4 py-2 mb-6"
      >
        Refresh Alerts
      </button>

      {/* ALERT LIST */}
      <div className="space-y-4">

        {alerts.length === 0 && (
          <p className="text-gray-500">
            No alerts found
          </p>
        )}

        {alerts.map((alert: any) => (
          <div
            key={alert.id}
            className="border p-4 bg-yellow-50"
          >

            <h2 className="font-bold text-red-600">
              ⚠ Low Stock Alert
            </h2>

            <p>
              Product ID: {alert.product_id}
            </p>

            <p>
              Message: {alert.message}
            </p>

            <p className="text-sm text-gray-500">
              {new Date(alert.created_at).toLocaleString()}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}