import axios from "axios";
import { storage } from "./storage";

/*
 ⚠️ CHANGE THIS
*/
const API_BASE_URL = "http://YOUR_FLASK_SERVER_IP:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   Attach JWT Automatically
========================= */
api.interceptors.request.use(
  async (config) => {
    const token = await storage.getToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/* =========================
   Auto logout if token invalid
========================= */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await storage.clearAll();
    }
    return Promise.reject(error);
  },
);

export default api;
