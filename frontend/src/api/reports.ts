import api from "./axios";

export const getSalesReport = async (userId: number) => {
  const res = await api.get(`/reports/reports/sales?user_id=${userId}`);
  return res.data;
};

export const getTopProducts = async () => {
  const res = await api.get("/reports/reports/top-products");
  return res.data;
};