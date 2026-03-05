import { useRouter } from "expo-router";
import { createContext, ReactNode, useContext, useState } from "react";

// --------------------------
// Types
// --------------------------
export interface User {
  id: number;
  staff_id: string;
  name: string;
  approved: boolean;
  firstLogin: boolean;
  is_admin?: boolean;
}

interface LoginResponse {
  success: boolean;
  message?: string;
  user?: User;
}

interface AuthContextType {
  user: User | null;
  login: (staffId: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
  updateUser: (updated: Partial<User>) => void;
}

// --------------------------
// Dummy Users
// --------------------------
const dummyUsers: Record<string, { password: string; user: User }> = {
  admin001: {
    password: "password",
    user: {
      id: 1,
      staff_id: "admin001",
      name: "Admin User",
      approved: true,
      firstLogin: true,
      is_admin: true,
    },
  },
  crew001: {
    password: "password",
    user: {
      id: 2,
      staff_id: "crew001",
      name: "Crew Member",
      approved: false,
      firstLogin: true,
    },
  },
  superadmin: {
    password: "password",
    user: {
      id: 3,
      staff_id: "superadmin",
      name: "Super Admin",
      approved: true,
      firstLogin: false,
      is_admin: true,
    },
  },
};

// --------------------------
// Context
// --------------------------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // ----------------------
  // Login
  // ----------------------
  const login = async (
    staffId: string,
    password: string,
  ): Promise<LoginResponse> => {
    const record = dummyUsers[staffId];
    if (!record || record.password !== password) {
      return { success: false, message: "Invalid credentials" };
    }

    setUser(record.user);

    // Navigate based on user status
    if (!record.user.approved) {
      router.replace("/(auth)/pending");
    } else if (record.user.firstLogin) {
      router.replace("/(tabs)/profile");
    } else {
      router.replace("/(tabs)/home");
    }

    return { success: true, user: record.user };
  };

  // ----------------------
  // Logout
  // ----------------------
  const logout = () => {
    setUser(null);
    router.replace("/(auth)/login");
  };

  // ----------------------
  // Update User
  // ----------------------
  const updateUser = (updated: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...updated });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// --------------------------
// Hook
// --------------------------
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
