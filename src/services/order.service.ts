import { environment } from "../constants/environment";
import type { ICart } from "../types/order";
import { fetchApi } from "../utils/fetch";
import { getLocalStorage } from "../utils/storage";

export const getOrders = async () => {
  const url = `${environment.API_URL}/orders?page=1&pageSize=10`;

  const result = await fetchApi(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${getLocalStorage("auth")}`,
    },
  }).then((data) => data);

  return result;
};

export const getOrderById = async (id: string) => {
  const url = `${environment.API_URL}/orders/${id}`;

  const result = await fetchApi(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${getLocalStorage("auth")}`,
    },
  }).then((data) => data);

  return result;
};

export const createOrder = async (payload: {
  customerName: string;
  tableNumber: number;
  cart: ICart[];
}) => {
  const url = `${environment.API_URL}/orders`;

  const result = await fetchApi(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${getLocalStorage("auth")}`,
    },
    body: JSON.stringify(payload),
  });

  return result;
};

export const updateOrder = async (id: string, payload: { status: string }) => {
  const url = `${environment.API_URL}/orders/${id}`;

  const result = await fetchApi(url, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${getLocalStorage("auth")}`,
    },
    body: JSON.stringify(payload),
  });

  return result;
};
