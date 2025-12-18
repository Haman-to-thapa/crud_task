import axios from "axios";

export const api = axios.create({
  baseURL: "https://crud-task-oh51.onrender.com/api",
  withCredentials: true
});
