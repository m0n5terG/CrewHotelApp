import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const newHotels = [
  {
    id: 1,
    name: "Hilton Tokyo",
    city: "Tokyo",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
  },
  {
    id: 2,
    name: "Marriott Paris",
    city: "Paris",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
  },
  {
    id: 3,
    name: "Hyatt Sydney",
    city: "Sydney",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
  },
];

const updatedHotels = [
  {
    id: 4,
    name: "Sheraton New York",
    city: "New York",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
  },
  {
    id: 5,
    name: "Intercontinental London",
    city: "London",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* NEW HOTELS */}
      <Text style={styles.sectionTitle}>Newly Added</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {newHotels.map((hotel) => (
          <View key={hotel.id} style={styles.card}>
            <Image source={{ uri: hotel.image }} style={styles.image} />
            <Text style={styles.hotelName}>{hotel.name}</Text>
            <Text style={styles.city}>{hotel.city}</Text>
          </View>
        ))}
      </ScrollView>

      {/* UPDATED HOTELS */}
      <Text style={styles.sectionTitle}>Recently Updated</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {updatedHotels.map((hotel) => (
          <View key={hotel.id} style={styles.card}>
            <Image source={{ uri: hotel.image }} style={styles.image} />
            <Text style={styles.hotelName}>{hotel.name}</Text>
            <Text style={styles.city}>{hotel.city}</Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 20,
    flexGrow: 1,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    marginTop: 20,
  },

  card: {
    width: 260,
    marginRight: 18,
  },

  image: {
    width: "100%",
    height: 160,
    borderRadius: 14,
  },

  hotelName: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
  },

  city: {
    fontSize: 15,
    color: "#666",
    marginTop: 2,
  },
});
