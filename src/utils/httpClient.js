import axios from "axios";

export let httpClient = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  method: "POST",
});
