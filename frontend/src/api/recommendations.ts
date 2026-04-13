import API from "./axios";

export const getRecommendations = async (userId: number) => {
  const res = await API.get(`/recommendations/${userId}`);
  return res.data;
};