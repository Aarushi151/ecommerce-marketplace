import API from "./axios";

// GET INVOICE BY ORDER ID
export const getInvoice = async (orderId: number) => {
  const res = await API.get(`/invoices/invoices/${orderId}`);
  return res.data;
};