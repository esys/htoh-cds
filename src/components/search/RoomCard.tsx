import React, { FunctionComponent } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { RoomRate } from "../../api/cds/cds";
import { Card } from "react-native-elements";

const bookingBlue = "rgb(31,56,125)";
const bookingGreen = "rgb(71,126,33)";

type Props = {
  item: RoomRate;
  onRoomSelect: (room: RoomRate) => void;
};

export const RoomCard: FunctionComponent<Props> = ({ item, onRoomSelect }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onRoomSelect(item)}>
      <Card containerStyle={styles.card} wrapperStyle={styles.cardInnerWrapper}>
        <Text>{item.RatCd}</Text>
        <Text style={styles.title}>{item.RatName}</Text>
        <Text>{item.RatDesc}</Text>
        <Text>
          {item.OtherCurrency.RatPrice} {item.OtherCurrency.CurCd}
        </Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  cardInnerWrapper: {},
  title: {
    fontWeight: "bold",
  },
});
