import axios from "axios";
import type { Product, Order, Review, User } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (username: string, password: string) =>
    apiClient.post<{ access_token: string; token_type: string }>("/auth/login", {
      username,
      password,
    }),
  register: (email: string, password: string, full_name?: string) =>
    apiClient.post<User>("/auth/register", { email, password, full_name }),
  getMe: () => apiClient.get<User>("/auth/me"),
};

export const productsApi = {
  list: (params?: Record<string, string | number>) =>
    apiClient.get<Product[]>("/products", { params }),
  get: (slug: string) => apiClient.get<Product>(`/products/${slug}`),
  create: (data: Partial<Product>) => apiClient.post<Product>("/products", data),
  update: (id: string, data: Partial<Product>) =>
    apiClient.put<Product>(`/products/${id}`, data),
  delete: (id: string) => apiClient.delete(`/products/${id}`),
};

export const ordersApi = {
  list: () => apiClient.get<Order[]>("/orders"),
  get: (id: string) => apiClient.get<Order>(`/orders/${id}`),
  create: (data: any) => apiClient.post<Order>("/orders", data),
};

export const reviewsApi = {
  list: (productId: string) => apiClient.get<Review[]>(`/reviews/product/${productId}`),
  create: (data: Partial<Review>) => apiClient.post<Review>("/reviews", data),
};

export const aiApi = {
  chat: (query: string) => apiClient.post("/ai/chat", { query }),
  recommendations: (query: string) => apiClient.post("/ai/recommendations", { query }),
  search: (query: string) => apiClient.post("/ai/search", { query }),
  generateDescription: (query: string) => apiClient.post("/ai/description", { query }),
};
