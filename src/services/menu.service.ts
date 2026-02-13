import { environment } from "../constants/environment";
import { fetchApi } from "../utils/fetch";

export const getMenus = async (categori?: string) => {
  let url = `${environment.API_URL}/menu?page=1&pageSize=25`;

  if (categori) {
    url += `&category=${categori}`;
  }

  const result = await fetchApi(url, {
    method: "GET",
  }).then((data) => data);

  return result;
};
