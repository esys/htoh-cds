import React, { FunctionComponent, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import { GlobalState } from "../state/store";
import { connect } from "react-redux";
import { getLogger } from "../../config/logging";
import { Hotel } from "../api/cds/cds";
import { getHotel } from "../state/hotel/selectors";

const logger = getLogger("RoomSearchResultScreen");

type Props = {
  navigation: any;

  // From Redux
  hotel: Hotel;
};

const HotelDetailsScreen: FunctionComponent<Props> = ({ navigation, hotel }: Props) => {
  useEffect(() => {
    navigation.setOptions({ title: hotel.HtlName });
  }, [hotel]);

  return (
    <View style={styles.container}>
      <Text>{hotel.HtlName}</Text>
      <Text>Photos wall</Text>
      <Text>Location with map</Text>
      <Text>Reviews</Text>

      <View style={styles.buttonContainer}>
        <Button title="Choose rooms" onPress={() => navigation.navigate("RoomResults")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
  },
});

const mapStateToProps = (state: GlobalState) => ({
  hotel: getHotel(state),
});

// const mapDispatchToProps = (dispatch: Dispatch<SearchActions>) => ({
//   dispatchUpdateSearch: (search: Search) => dispatch(createUpdateSearchAction(search)),
// });

export default connect(mapStateToProps, null)(HotelDetailsScreen);
