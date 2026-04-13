import API from "./axios";

// GET ALL ALERTS (ADMIN ONLY)
export const getAlerts = async () => {
  const res = await API.get("/alerts/alerts/");
  return res.data;
};