import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Prediction } from "../../api/google-places/places";

type Props = {
  item: Prediction;
  onPress: (p: Prediction) => void;
};

export const PlaceCard: React.SFC<Props> = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      <Text style={styles.name}>{item.description}</Text>
      <Text style={styles.type}>{item.types[0]}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
  },
  type: {
    fontStyle: "italic",
  },
});
