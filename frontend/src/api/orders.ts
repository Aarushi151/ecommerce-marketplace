import API from "./axios";

// CHECKOUT (place order)
export const checkout = async () => {
  const res = await API.post("/orders/orders/checkout");
  return res.data;
};

// GET MY ORDERS
export const getOrders = async () => {
  const res = await API.get("/orders/orders/");
  return res.data;
};