import React, { Component, Dispatch } from "react";
import { FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { createAddHotelAction, HotelActions, createDeleteHotelAction } from "../state/hotel/actions";
import { Hotel } from "../state/hotel/reducer";
import { AppState } from "../state/store";
import { getHotels } from "../state/hotel/selectors";
import { HotelCard } from "../components/HotelCard";

type Props = {
  navigation: any; // do better
  hotels: Hotel[];
  addHotel: (hotel: Hotel) => void;
  deleteHotel: (id: string) => void;
};

class HomeScreen extends Component<Props, {}> {
  renderItem = ({ item }: { item: Hotel }) => {
    const { deleteHotel, navigation } = this.props;
    return (
      <HotelCard
        hotel={item}
        onDelete={(id) => {
          deleteHotel(id);
        }}
        onTouch={(id) => {
          navigation.navigate("HotelList", { id });
        }}
      />
    );
  };

  render() {
    const { hotels } = this.props;
    return (
      <FlatList
        style={styles.container}
        data={hotels}
        renderItem={this.renderItem}
        keyExtractor={(item) => item.id}
      ></FlatList>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  address: {
    fontSize: 12,
  },
});

const mapStateToProps = (state: AppState) => ({
  hotels: getHotels(state),
});

const mapDispatchToProps = (dispatch: Dispatch<HotelActions>) => ({
  addHotel: (hotel: Hotel) => dispatch(createAddHotelAction(hotel)),
  deleteHotel: (id: string) => dispatch(createDeleteHotelAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
