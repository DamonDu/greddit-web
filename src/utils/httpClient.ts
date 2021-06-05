import axios, { AxiosInstance } from "axios";

export let httpClient: AxiosInstance;

httpClient = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  method: "post",
});
