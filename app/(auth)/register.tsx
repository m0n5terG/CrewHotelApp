import { router } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Crew Hotel</Text>
        <Text style={styles.subtitle}>Register new crew account</Text>
      </View>

      {/* FORM */}
      <View style={styles.form}>
        <TextInput
          placeholder="Staff ID"
          placeholderTextColor="#888"
          style={styles.input}
        />

        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#888"
          style={styles.input}
        />

        <TextInput
          placeholder="Short Name (Optional)"
          placeholderTextColor="#888"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          style={styles.input}
        />

        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          secureTextEntry
          style={styles.input}
        />

        {/* REGISTER BUTTON */}
        <Pressable
          style={styles.registerButton}
          onPress={() => router.replace("/(auth)/pending")}
        >
          <Text style={styles.registerText}>Register</Text>
        </Pressable>

        {/* BACK TO LOGIN */}
        <Pressable onPress={() => router.push("/(auth)/login")}>
          <Text style={styles.loginText}>Already have an account? Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1E3B",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  header: {
    marginBottom: 40,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "white",
  },

  subtitle: {
    fontSize: 16,
    color: "#C7D2FE",
    marginTop: 6,
  },

  form: {
    gap: 12,
  },

  input: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
  },

  registerButton: {
    backgroundColor: "#10B981",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  registerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  loginText: {
    textAlign: "center",
    marginTop: 18,
    color: "#93C5FD",
  },
});
