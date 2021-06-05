import { makeUseAxios, UseAxios } from "axios-hooks";
import { httpClient } from "./httpClient";

export let useHttpClient: UseAxios;

useHttpClient = makeUseAxios({
  axios: httpClient,
});
