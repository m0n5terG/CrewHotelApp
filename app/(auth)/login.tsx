import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const { login } = useAuth();
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const result = await login(staffId, password);

    if (!result.success) {
      alert(result.message);
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crew Hotel Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Staff ID"
        value={staffId}
        onChangeText={setStaffId}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
