const API_URL = import.meta.env.VITE_RENDER_URL;
const BASE_URL = `${API_URL}/api`;

export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(BASE_URL + url, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    },
    ...options
  });

  return res.json();
};
