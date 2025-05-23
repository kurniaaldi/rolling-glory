/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL_API;

export const getProducts = async ({ page }: { page: number }) => {
  const response = await axios.get(
    `${API_BASE}?page[number]=${page || 1}&page[size]=6`,
  );
  return response.data;
};

export const getProductDetail = async (id: any) => {
  const response = await axios.get(`${API_BASE}/${id}`);
  return response.data;
};

export const postProductWishlist = async (id: any) => {
  const response = await axios.post(`${API_BASE}/${id}/wishlist`);
  return response.data;
};
