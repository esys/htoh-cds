import React, { FunctionComponent } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { GlobalState } from "../state/store";
import { connect } from "react-redux";
import { getLogger } from "../../config/logging";
import { Hotel, RoomRate } from "../api/cds/cds";
import { getHotel } from "../state/hotel/selectors";
import { RoomCard } from "../components/search/RoomCard";
import uuidv1 from "uuid/v1";

const logger = getLogger("RoomSearchResultScreen");

type Props = {
  // From Redux
  hotel: Hotel;
};

const RoomSearchResultScreen: FunctionComponent<Props> = ({ hotel }: Props) => {
  return (
    <View style={styles.container}>
      <Text>{hotel.HtlName}</Text>
      <FlatList
        style={styles.list}
        data={hotel.RoomRateList}
        renderItem={({ item }) => {
          return (
            <RoomCard
              item={item}
              onRoomSelect={() => {
                console.log("room select");
              }}
            />
          );
        }}
        keyExtractor={(item: RoomRate) => uuidv1()} // item.RatCd is not unique enough
      />
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
