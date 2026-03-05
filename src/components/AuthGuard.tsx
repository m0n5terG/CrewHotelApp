import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthGuard({ children }: any) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/(auth)/login");
      return;
    }

    if (!user.approved) {
      router.replace("/(auth)/pending");
      return;
    }

    if (user.firstLogin) {
      router.replace("/(tabs)/profile");
      return;
    }
  }, [user, router]);

  return children;
}
