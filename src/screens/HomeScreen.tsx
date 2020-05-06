import React, { Component, Dispatch } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { GlobalState } from "../state/store";
import SearchForm from "../components/search/SearchForm";
import { Place, Search } from "../state/search/reducer";
import { getSearch } from "../state/search/selectors";
import { createUpdateSearchAction, SearchActions } from "../state/search/actions";

type Props = {
  navigation: any; // do better
  query: string;

  // From Redux
  search: Search;
  dispatchUpdateSearch: (search: Search) => void;
};

class HomeScreen extends Component<Props, {}> {
  onFormValidate(place: Place, start: string, end: string) {
    this.props.dispatchUpdateSearch({ place, start, end });
  }

  render() {
    const { navigation, search } = this.props;
    return (
      <View style={styles.container}>
        <SearchForm navigation={navigation} onFormValidate={this.onFormValidate} />
      </View>
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

const mapStateToProps = (state: GlobalState) => ({
  search: getSearch(state),
});

const mapDispatchToProps = (dispatch: Dispatch<SearchActions>) => ({
  dispatchUpdateSearch: (search: Search) => dispatch(createUpdateSearchAction(search)),
});

export default connect(mapStateToProps)(HomeScreen);

/*
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
*/
