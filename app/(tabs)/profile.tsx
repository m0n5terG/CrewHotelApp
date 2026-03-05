import { useAuth } from "@/context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const { user, updateUser } = useAuth();
  const [username, setUsername] = useState(user?.name || "");
  const [photo, setPhoto] = useState<string | null>(null);
  const [password, setPassword] = useState("");

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "Please allow access to photos.");
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const handleUpdate = () => {
    updateUser({ name: username });
    Alert.alert("Profile Updated", "Your profile has been updated.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {user?.firstLogin ? "Complete Your Profile" : "Profile"}
      </Text>

      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.image} />
        ) : (
          <Text>Select Photo</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Username / aka"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password (optional)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title={user?.firstLogin ? "Complete Profile" : "Update Profile"}
        onPress={handleUpdate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
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
  imagePicker: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    alignSelf: "center",
  },
  image: { width: 150, height: 150, borderRadius: 75 },
});
