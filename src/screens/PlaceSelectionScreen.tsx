import React, { Component, Dispatch } from "react";
import { View, StyleSheet } from "react-native";
import PlaceForm from "../components/search/PlaceForm";
import { Place, Search } from "../state/search/reducer";
import { getSearch } from "../state/search/selectors";
import { connect } from "react-redux";
import { SearchActions, createUpdateSearchAction } from "../state/search/actions";
import { GlobalState } from "../state/store";

type Props = {
  navigation: any;

  // Redux
  search: Search;
  dispatchUpdateSearch: (search: Search) => void;
};

class PlaceSelectionScreen extends Component<Props, {}> {
  render() {
    return (
      <View style={styles.container}>
        <PlaceForm navigation={this.props.navigation} />
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

export default connect(mapStateToProps, mapDispatchToProps)(PlaceSelectionScreen);
