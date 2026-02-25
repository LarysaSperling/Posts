import { api } from "./api";

export const postsApi = {
  getAll: (page = 1, limit = 3) =>
    api.get("/posts", { params: { page, limit, sortBy: "createdAt", order: "desc" } }),

  create: (payload) => api.post("/posts", payload),

  remove: (id) => api.delete(`/posts/${id}`),
};