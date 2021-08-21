import { makeUseAxios } from "axios-hooks";
import { httpClient } from "./httpClient";

export let useHttpClient = makeUseAxios({
  axios: httpClient,
});
