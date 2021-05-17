import { makeUseAxios } from "axios-hooks";
import { httpClient } from "./httpClient";

export const useHttpClient = makeUseAxios({
  axios: httpClient,
});
