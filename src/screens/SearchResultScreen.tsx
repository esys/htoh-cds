import React, { Component, Dispatch } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GlobalState } from "../state/store";
import { getSearch } from "../state/search/selectors";
import { SearchActions, createUpdateSearchAction } from "../state/search/actions";
import { Search } from "../state/search/reducer";
import { connect } from "react-redux";

type Props = {
  route: any;
};

class SearchResultScreen extends Component<Props, {}> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hotel id</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
});

const mapStateToProps = (state: GlobalState) => ({
  search: getSearch(state),
});

const mapDispatchToProps = (dispatch: Dispatch<SearchActions>) => ({
  dispatchUpdateSearch: (search: Search) => dispatch(createUpdateSearchAction(search)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultScreen);
