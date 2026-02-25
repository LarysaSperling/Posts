import axios from "axios";

export const api = axios.create({
  baseURL: "https://699eb2fe78dda56d396b07d3.mockapi.io",
  headers: { "Content-Type": "application/json" },
});