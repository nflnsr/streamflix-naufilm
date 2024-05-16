import axios from "axios";
import { BASE_URL_API, API_ACCESS_TOKEN } from "@/config/global";

const axiosInstance = axios.create({
  baseURL: BASE_URL_API,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${API_ACCESS_TOKEN}`,
  },
});

export { axiosInstance };
