import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function HotelDetails() {
  const { hotelId } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Hotel ID:</Text>
      <Text>{hotelId}</Text>
    </View>
  );
}
