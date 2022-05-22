import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://goscrum-api.alkemy.org",
  headers: {
    "Content-Type": "application/json",
    // "Authorization": "Bearer " + localStorage.getItem("token"),
  },
});
