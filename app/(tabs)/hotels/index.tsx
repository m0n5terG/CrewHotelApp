// app/(tabs)/hotels/index.tsx
import { Image, SectionList, StyleSheet, Text, View } from "react-native";

const hotelsByRegion = [
  {
    title: "Europe",
    data: [
      {
        id: "1",
        name: "Sunrise Hotel",
        location: "Paris, France",
        photo: "https://via.placeholder.com/150",
      },
      {
        id: "2",
        name: "Grand Palace",
        location: "Rome, Italy",
        photo: "https://via.placeholder.com/150",
      },
    ],
  },
  {
    title: "Asia",
    data: [
      {
        id: "3",
        name: "Ocean View Hotel",
        location: "Tokyo, Japan",
        photo: "https://via.placeholder.com/150",
      },
      {
        id: "4",
        name: "Lotus Inn",
        location: "Bangkok, Thailand",
        photo: "https://via.placeholder.com/150",
      },
    ],
  },
  {
    title: "Australia",
    data: [
      {
        id: "5",
        name: "Harbour Hotel",
        location: "Sydney, Australia",
        photo: "https://via.placeholder.com/150",
      },
    ],
  },
];

export default function HotelsIndex() {
  const renderHotel = ({
    item,
  }: {
    item: (typeof hotelsByRegion)[0]["data"][0];
  }) => (
    <View style={styles.hotelItem}>
      <Image source={{ uri: item.photo }} style={styles.photo} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>{item.location}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={hotelsByRegion}
        keyExtractor={(item) => item.id}
        renderItem={renderHotel}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionTitle}>{title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  hotelItem: {
    flexDirection: "row",
    marginBottom: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 8,
  },
  photo: { width: 80, height: 80, borderRadius: 8, marginRight: 12 },
  name: { fontSize: 16, fontWeight: "bold" },
  location: { fontSize: 14, color: "#555" },
});
