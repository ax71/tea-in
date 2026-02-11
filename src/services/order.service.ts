import { environment } from "../constants/environment";
import { fetchApi } from "../utils/fetch";
import { getLocalStorage } from "../utils/storage";

export const getOrders = async () => {
  const url = `${environment.API_URL}/orders?page=1&pageSize=25`;

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
