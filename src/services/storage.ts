// src/services/storage.ts
export interface StoredUser {
  id: number;
  staff_id: string;
  name: string;
  shortname?: string;
  approved?: boolean;
  is_admin?: boolean;
}

let memoryToken: string | null = null;
let memoryUser: StoredUser | null = null;

export const storage = {
  /* ---------- TOKEN ---------- */
  setToken: async (token: string) => {
    memoryToken = token;
  },
  getToken: async (): Promise<string | null> => memoryToken,
  removeToken: async () => {
    memoryToken = null;
  },

  /* ---------- USER ---------- */
  setUser: async (user: StoredUser) => {
    memoryUser = user;
  },
  getUser: async (): Promise<StoredUser | null> => memoryUser,
  removeUser: async () => {
    memoryUser = null;
  },

  /* ---------- CLEAR ---------- */
  clearAll: async () => {
    memoryToken = null;
    memoryUser = null;
  },
};
