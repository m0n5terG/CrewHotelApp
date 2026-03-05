import { StyleSheet, Text, View } from "react-native";

export default function PendingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Pending Approval</Text>

      <Text>Your account is awaiting admin approval.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, marginBottom: 10 },
});
