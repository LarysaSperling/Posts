import { api } from "./api";

const normalizePost = (p) => ({
  ...p,
 
  text: p.text ?? p.content ?? "",
  
  createdAt: p.createdAt ?? new Date().toISOString(),
});

export const postsApi = {
  getAll: async (page = 1, limit = 3) => {
    const res = await api.get("/posts", {
      params: { page, limit, sortBy: "createdAt", order: "desc" },
    });

    return {
      ...res,
      data: (res.data ?? []).map(normalizePost),
    };
  },

  create: async (data) => {
    
    const payload = {
      title: data.title ?? "",
      text: data.text ?? data.content ?? "",
      createdAt: new Date().toISOString(),
    };

    const res = await api.post("/posts", payload);
    return {
      ...res,
      data: normalizePost(res.data),
    };
  },

  remove: (id) => api.delete(`/posts/${id}`),
};