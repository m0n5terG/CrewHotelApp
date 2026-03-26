import HotelCard from "@/components/HotelCard";
import { Link } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const newHotels = [
  {
    id: 1,
    name: "Hilton Tokyo",
    city: "Tokyo",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    discount: "10%",
  },
  {
    id: 2,
    name: "Marriott Paris",
    city: "Paris",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
    discount: "15%",
  },
];

const updatedHotels = [
  {
    id: 3,
    name: "Hyatt Sydney",
    city: "Sydney",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
    discount: "12%",
  },
  {
    id: 4,
    name: "Sheraton New York",
    city: "New York",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
    discount: "8%",
  },
];

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {/* Newly Added Hotels */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Newly Added</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {newHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </ScrollView>
        </View>

        {/* Recently Updated Hotels */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recently Updated</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {updatedHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* ➕ FLOATING ADD BUTTON */}
      <Link href="/(tabs)/add-hotel" asChild>
        <TouchableOpacity style={styles.fab}>
          <Text style={styles.fabText}>＋</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 100, // space for floating button
  },

  section: {
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 14,
  },

  /* 🔥 FLOATING BUTTON */
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",

    // shadow (iOS)
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },

    // elevation (Android)
    elevation: 6,
  },

  fabText: {
    color: "#fff",
    fontSize: 30,
    lineHeight: 30,
  },
});
