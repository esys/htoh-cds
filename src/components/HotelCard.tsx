import React from "react";
import { Hotel } from "../state/hotel/reducer";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

type Props = {
  hotel: Hotel;
  onDelete: (id: string) => void;
  onTouch: (id: string) => void;
};

export const HotelCard: React.SFC<Props> = ({ hotel, onDelete, onTouch }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <TouchableOpacity onPress={() => onTouch(hotel.id)}>
          <Text style={styles.name}>{hotel.name}</Text>
          <Text style={styles.address}>{hotel.address}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rightColumn}>
        <TouchableOpacity onPress={() => onDelete(hotel.id)}>
          <Icon name="delete-forever" size={32} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 70,
    flexDirection: "row",
  },
  leftColumn: {
    width: "70%",
  },
  rightColumn: {
    width: "30%",
    flexDirection: "row-reverse",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  address: {
    fontSize: 12,
  },
});
