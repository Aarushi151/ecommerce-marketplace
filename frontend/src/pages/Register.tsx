import { useState } from "react";
import { registerUser } from "../api/auth";
import { handleApiError } from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    try {
      await registerUser({
        name,
        email,
        password,
        role,
      });

      setSuccess("User registered successfully 🎉");
      setError("");

    } catch (err: any) {
      setError(handleApiError(err));
      setSuccess("");
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Register
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <div className="grid grid-cols-2 gap-4 mb-6">

        <input
          placeholder="Name"
          className="border p-2"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="border p-2"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="border p-2"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>

      </div>

      <button
        onClick={handleRegister}
        className="bg-green-500 text-white px-6 py-2"
      >
        Register
      </button>

    </div>
  );
}