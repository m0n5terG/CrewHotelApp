import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Hotel = {
  id: number;
  name: string;
  city: string;
  image: string;
  discount?: string;
};

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/hotels/${hotel.id}`)}
    >
      <Image source={{ uri: hotel.image }} style={styles.image} />

      <View style={styles.overlay}>
        <Text style={styles.name}>{hotel.name}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.city}>{hotel.city}</Text>

        {hotel.discount && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Crew {hotel.discount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 270,
    marginRight: 18,
    borderRadius: 16,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 5,
  },

  image: {
    width: "100%",
    height: 170,
  },

  overlay: {
    position: "absolute",
    bottom: 45,
    left: 12,
  },

  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },

  city: {
    color: "#555",
    fontSize: 14,
  },

  badge: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
