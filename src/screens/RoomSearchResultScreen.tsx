import React, { FunctionComponent } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { GlobalState } from "../state/store";
import { connect } from "react-redux";
import { getLogger } from "../../config/logging";
import { Hotel } from "../api/cds/cds";
import { getHotel } from "../state/hotel/selectors";

const logger = getLogger("RoomSearchResultScreen");

type Props = {
  // From Redux
  hotel: Hotel;
};

const RoomSearchResultScreen: FunctionComponent<Props> = ({ hotel }: Props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator style={styles.loader} size="large" color="rgb(82,136,216)" />
      <Text>{hotel.HtlName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
  },
  loader: {
    marginTop: "30%",
  },
  list: {
    padding: 0,
  },
});

const mapStateToProps = (state: GlobalState) => ({
  hotel: getHotel(state),
});

// const mapDispatchToProps = (dispatch: Dispatch<SearchActions>) => ({
//   dispatchUpdateSearch: (search: Search) => dispatch(createUpdateSearchAction(search)),
// });

export default connect(mapStateToProps, null)(RoomSearchResultScreen);
