import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/context/AuthContext";
import { Tabs } from "expo-router";
import { Button } from "react-native";

export default function TabsLayout() {
  const { logout } = useAuth();
  return (
    <AuthGuard>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            title: "Hotels",
            headerRight: () => <Button title="Logout" onPress={logout} />,
          }}
        />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      </Tabs>
    </AuthGuard>
  );
}
