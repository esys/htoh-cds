import React, { FunctionComponent } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Hotel } from "../../api/cds/cds";
import { Card } from "react-native-elements";

type Props = {
  item: Hotel;
  onPress: (hotel: Hotel) => void;
};

export const HotelCard: FunctionComponent<Props> = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      <Card>
        <Text>{item.HtlName}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
