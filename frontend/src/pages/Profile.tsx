import { useEffect, useState } from "react";
import axios from "axios";
import { handleApiError } from "../api/axios";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");

  const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  const loadProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/auth/auth/me/",
        { headers: getHeaders() }
      );
      setUser(res.data);
    } catch (err: any) {
      setError(handleApiError(err));
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {user && (
        <div className="border p-4">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      )}
    </div>
  );
}