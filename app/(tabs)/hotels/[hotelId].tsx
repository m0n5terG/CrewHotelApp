import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Linking,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const { width } = Dimensions.get("window");

export default function HotelDetails() {
  const { hotelId } = useLocalSearchParams();
  const navigation = useNavigation();

  const scrollY = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  const hotel = {
    id: hotelId,
    name: "Hilton Tokyo",
    city: "Tokyo, Japan",
    address: "6 Chome-6-2 Nishishinjuku, Shinjuku City, Tokyo 160-0023, Japan",
    discount: "10%",
    coords: {
      latitude: 35.6895,
      longitude: 139.6917,
    },
    photos: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900",
    ],
  };

  // ✅ Header title
  useEffect(() => {
    navigation.setOptions({
      title: `${hotel.city} - ${hotel.name}`,
    });
  }, [hotel.city, hotel.name, navigation]);

  // ✅ Header collapse
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [260, 100],
    extrapolate: "clamp",
  });

  // ✅ Carousel scroll
  const handleCarouselScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const openMap = () => {
    const query = encodeURIComponent(`${hotel.name}, ${hotel.address}`);
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
      >
        {/* HEADER CAROUSEL */}
        <Animated.View
          style={[styles.headerImageContainer, { height: headerHeight }]}
        >
          <Animated.ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleCarouselScroll}
            scrollEventThrottle={16}
            decelerationRate="fast"
          >
            {hotel.photos.map((photo, index) => (
              <Image key={index} source={{ uri: photo }} style={styles.image} />
            ))}
          </Animated.ScrollView>

          <View style={styles.overlay} />
        </Animated.View>

        {/* DOTS */}
        <View style={styles.dots}>
          {hotel.photos.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, activeIndex === index && styles.activeDot]}
            />
          ))}
        </View>

        {/* HEADER INFO */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.hotelName}>{hotel.name}</Text>
            <Text style={styles.city}>{hotel.city}</Text>
            <Text style={styles.address}>{hotel.address}</Text>
          </View>

          <View style={styles.discount}>
            <Text style={styles.discountText}>Crew {hotel.discount}</Text>
          </View>
        </View>

        {/* MAP */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              ...hotel.coords,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            <Marker coordinate={hotel.coords} />
          </MapView>

          <TouchableOpacity style={styles.mapButton} onPress={openMap}>
            <Text style={styles.mapButtonText}>Open in Maps</Text>
          </TouchableOpacity>
        </View>

        {/* AMENITIES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <Text style={styles.item}>• Gym</Text>
          <Text style={styles.item}>• Pool</Text>
          <Text style={styles.item}>• Free WiFi</Text>
        </View>

        {/* NEARBY */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby</Text>
          <Text style={styles.item}>• 7-Eleven (2 min)</Text>
          <Text style={styles.item}>• Metro (5 min)</Text>
        </View>

        {/* COMMENTS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Comments</Text>

          <View style={styles.commentBox}>
            <Text style={styles.commentUser}>User1234</Text>
            <Text style={styles.commentText}>
              Great location and very clean 👍
            </Text>
          </View>

          <View style={styles.commentBox}>
            <Text style={styles.commentUser}>User5678</Text>
            <Text style={styles.commentText}>
              Rooms are small but convenient.
            </Text>
          </View>
        </View>

        {/* ADD COMMENT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add Comment</Text>

          <TextInput
            placeholder="Share your experience..."
            style={styles.input}
          />

          <TouchableOpacity style={styles.mapButton}>
            <Text style={styles.mapButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImageContainer: {
    width: "100%",
    overflow: "hidden",
  },

  image: {
    width: width,
    height: 260,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: "#007AFF",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  hotelName: { fontSize: 24, fontWeight: "700" },
  city: { fontSize: 16, color: "#666" },
  address: { fontSize: 14, color: "#888", marginTop: 4 },

  discount: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
    alignSelf: "flex-start",
  },

  discountText: { color: "#fff", fontWeight: "600" },

  mapContainer: { marginHorizontal: 20, marginBottom: 20 },

  map: {
    width: "100%",
    height: 180,
    borderRadius: 12,
  },

  mapButton: {
    marginTop: 10,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  mapButtonText: {
    color: "#fff",
    fontWeight: "600",
  },

  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },

  item: {
    fontSize: 15,
    marginBottom: 4,
  },

  commentBox: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  commentUser: {
    fontWeight: "600",
    marginBottom: 4,
  },

  commentText: {
    color: "#444",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});
