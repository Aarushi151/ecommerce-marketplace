import api, { handleApiError } from "./axios";
import axios from "axios";

const BASE_URL = "http://localhost:8000";

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// LIST PRODUCTS
export const getProducts = async (filters: any) => {
  try {
    const params: any = {};

    if (filters.search) params.search = filters.search;
    if (filters.min_price !== undefined) params.min_price = filters.min_price;
    if (filters.max_price !== undefined) params.max_price = filters.max_price;
    if (filters.category_id !== undefined) params.category_id = filters.category_id;

    console.log("API PARAMS:", params); // debug

    const res = await api.get("/products/products/", {
      params,
    });

    return res.data;

  } catch (err: any) {
    throw handleApiError(err); // ✅ send clean error to UI
  }
};

// SINGLE PRODUCT
export const getProduct = async (id: number) => {
  const res = await axios.get(
    `${BASE_URL}/products/products/${id}`
  );
  return res.data;
};

// CREATE
export const createProduct = async (data: any) => {
  const res = await axios.post(
    `${BASE_URL}/products/products/`,
    data,
    { headers: getHeaders() }
  );
  return res.data;
};

// UPDATE
export const updateProduct = async (id: number, data: any) => {
  const res = await axios.put(
    `${BASE_URL}/products/products/${id}`,
    data,
    { headers: getHeaders() }
  );
  return res.data;
};

// DELETE
export const deleteProduct = async (id: number) => {
  const res = await axios.delete(
    `${BASE_URL}/products/products/${id}`,
    { headers: getHeaders() }
  );
  return res.data;
};

// MY PRODUCTS
export const getMyProducts = async () => {
  const res = await axios.get(
    `${BASE_URL}/products/products/seller/my-products`,
    { headers: getHeaders() }
  );
  return res.data;
};