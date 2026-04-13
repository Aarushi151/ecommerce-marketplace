import API from "./axios";
import axios from "axios";

const BASE_URL = "http://localhost:8000";

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});
// VIEW CART
export const getCart = async () => {
  const res = await API.get("/cart/cart/");
  return res.data;
};

// ADD TO CART
export const addToCart = async (productId: number, quantity = 1) => {
  const res = await axios.post(
    `${BASE_URL}/cart/cart/`,
    {
      product_id: productId,
      quantity,
    },
    {
      headers: getHeaders(),
    }
  );
  return res.data;
};

// UPDATE ITEM
export const updateCartItem = async (itemId: number, data: any) => {
  const res = await API.put(`/cart/cart/${itemId}`, data);
  return res.data;
};

// REMOVE ITEM
export const removeCartItem = async (itemId: number) => {
  const res = await API.delete(`/cart/cart/${itemId}`);
  return res.data;
};

// CLEAR CART
export const clearCart = async () => {
  const res = await API.delete("/cart/cart/");
  return res.data;
};