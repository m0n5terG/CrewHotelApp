import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const AMENITIES_LIST = [
  "Gym",
  "Pool",
  "Free WiFi",
  "Spa",
  "Restaurant",
  "Bar",
  "Parking",
];

export default function AddHotel() {
  const [hotelName, setHotelName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [discount, setDiscount] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const pickImage = async () => {
    if (photos.length >= 10) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhotos([...photos, result.assets[0].uri]);
    }
  };

  const toggleAmenity = (item: string) => {
    if (selectedAmenities.includes(item)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== item));
    } else {
      setSelectedAmenities([...selectedAmenities, item]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Add New Hotel</Text>

        {/* PHOTOS */}
        <Text style={styles.sectionTitle}>Photos</Text>
        <ScrollView horizontal>
          {photos.map((p, i) => (
            <Image key={i} source={{ uri: p }} style={styles.image} />
          ))}
          {photos.length < 10 && (
            <TouchableOpacity style={styles.addPhoto} onPress={pickImage}>
              <Text style={{ fontSize: 28 }}>＋</Text>
            </TouchableOpacity>
          )}
        </ScrollView>

        {/* INFO */}
        <TextInput
          placeholder="Hotel Name"
          style={styles.input}
          value={hotelName}
          onChangeText={setHotelName}
        />

        <TextInput
          placeholder="City"
          style={styles.input}
          value={city}
          onChangeText={setCity}
        />

        <TextInput
          placeholder="Address"
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />

        <TextInput
          placeholder="Discount (e.g. 10%)"
          style={styles.input}
          value={discount}
          onChangeText={setDiscount}
        />

        {/* AMENITIES */}
        <Text style={styles.sectionTitle}>Amenities</Text>
        <View style={styles.chipContainer}>
          {AMENITIES_LIST.map((item) => {
            const selected = selectedAmenities.includes(item);
            return (
              <TouchableOpacity
                key={item}
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => toggleAmenity(item)}
              >
                <Text
                  style={selected ? styles.chipTextSelected : styles.chipText}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* PREVIEW BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowPreview(true)}
        >
          <Text style={styles.buttonText}>Preview</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* PREVIEW */}
      {showPreview && (
        <View style={styles.preview}>
          <ScrollView>
            <Text style={styles.title}>Preview</Text>

            <ScrollView horizontal>
              {photos.map((p, i) => (
                <Image key={i} source={{ uri: p }} style={styles.image} />
              ))}
            </ScrollView>

            <Text style={styles.hotelName}>{hotelName}</Text>
            <Text>{city}</Text>
            <Text>{address}</Text>

            <Text style={{ marginTop: 10 }}>Crew {discount}</Text>

            <Text style={styles.sectionTitle}>Amenities</Text>
            {selectedAmenities.map((a, i) => (
              <Text key={i}>• {a}</Text>
            ))}

            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowPreview(false)}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },

  title: { fontSize: 24, fontWeight: "700", marginBottom: 15 },

  sectionTitle: { fontSize: 18, fontWeight: "600", marginTop: 15 },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },

  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },

  addPhoto: {
    width: 100,
    height: 100,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },

  chip: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },

  chipSelected: {
    backgroundColor: "#007AFF",
  },

  chipText: { color: "#333" },
  chipTextSelected: { color: "#fff" },

  button: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },

  buttonText: { color: "#fff", fontWeight: "600" },

  preview: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    padding: 20,
  },

  hotelName: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
  },
});
