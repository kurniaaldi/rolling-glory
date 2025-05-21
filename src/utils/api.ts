/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_BASE = "https://recruitment.dev.rollingglory.com/api/v2/gifts";

export const getProducts = async () => {
  const response = await axios.get(`${API_BASE}?page[number]=1&page[size]=6`);
  return response.data;
};

export const getProductDetail = async (id: any) => {
  const response = await axios.get(`${API_BASE}/${id}`);
  return response.data;
};
