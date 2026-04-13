import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex gap-4 items-center">

      {/* LEFT */}
      <Link to="/" className="font-bold text-lg">
        🛒E-Commerce store
      </Link>

      <Link to="/products">Products</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/orders">Orders</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/reports">Reports</Link>
      {/* ✅ SELLER FEATURES (ALWAYS SHOW FOR NOW) */}
      <Link to="/my-products">My Products</Link>
      <Link to="/categories">Categories</Link>
      {/* RIGHT */}
      <div className="ml-auto flex gap-3">

        <button
          onClick={() => navigate("/recommendations")}
          className="bg-purple-500 px-3 py-1"
        >
          AI Recs
        </button>

        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1"
        >
          Logout
        </button>

      </div>
    </nav>
  );
}