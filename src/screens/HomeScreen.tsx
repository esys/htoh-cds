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
  render() {
    const { navigation, search } = this.props;
    return (
      <View style={styles.container}>
        <SearchForm navigation={navigation} />
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
