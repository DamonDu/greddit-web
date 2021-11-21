import axios from "axios";

export let httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  withCredentials: true,
  method: "POST",
});
