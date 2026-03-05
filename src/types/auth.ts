export interface LoginRequest {
  staff_id: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: number;
    staff_id: string;
    name: string;
    shortname?: string;
    is_admin: boolean;
  };
}
