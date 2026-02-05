import { fetchApi } from "../utils/fetch";
import { environment } from "../constants/environment";
import type { ILogin } from "../types/auth";

export const login = async (payload: ILogin) => {
  const result = await fetchApi(`${environment.API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return result;
};
