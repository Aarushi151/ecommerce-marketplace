import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Error handler
export const handleApiError = (err: any) => {
  // FastAPI validation errors (array)
  if (Array.isArray(err?.response?.data)) {
    return err.response.data.map((e: any) => e.msg).join(", ");
  }

  // FastAPI detail
  if (err?.response?.data?.detail) {
    return err.response.data.detail;
  }

  // Fallback
  if (err.message) return err.message;

  return "Something went wrong";
};

export default api;