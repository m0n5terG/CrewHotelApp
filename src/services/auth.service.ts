// src/services/auth.service.ts
import { StoredUser } from "./storage";

export interface LoginResponse {
  access_token: string;
  user: StoredUser;
}

const AuthService = {
  login: async (staff_id: string, password: string): Promise<LoginResponse> => {
    // Replace with actual API call
    // For now, we can return a dummy response
    return {
      access_token: "dummy-token",
      user: {
        id: 1,
        staff_id,
        name: "Dummy User",
        shortname: "DU",
        approved: true,
        is_admin: true,
      },
    };

    // If using API call:
    // const response = await api.post<LoginResponse>("/auth/login", { staff_id, password });
    // return response.data;
  },
};

export default AuthService;
