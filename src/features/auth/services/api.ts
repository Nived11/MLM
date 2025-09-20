import api from "../../../lib/api";

export const adminLogin = async (credentials: { user_id: string; password: string }) => {
  const res = await api.post("/login/", credentials);
  return res.data;
};
