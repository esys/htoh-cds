import React, { Dispatch, FunctionComponent, useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { GlobalState } from "../state/store";
import { getSearch } from "../state/search/selectors";
import { SearchActions, createUpdateSearchAction } from "../state/search/actions";
import { Search } from "../state/search/reducer";
import { connect } from "react-redux";
import CdsApi, { SearchResponse, Hotel } from "../api/cds/cds";
import { getLogger } from "../../config/logging";
import { getJSON } from "../api/common";
import { FlatList } from "react-native-gesture-handler";
import { HotelCard } from "../components/search/HotelCard";

const defaultRadius = 30;
const logger = getLogger("SearchResultsScreen");

type Props = {
  search: Search;
};

const SearchResultScreen: FunctionComponent<Props> = ({ search }: Props) => {
  const cds = new CdsApi();
  const [results, setResults] = useState<SearchResponse>();

  useEffect(() => {
    async function fetchHotels() {
      if (!(search.start && search.end && search.place)) {
        logger.warn(`Missing search parameters ${JSON.stringify(search)}`);
        return;
      }
      const resp = await getJSON<SearchResponse>(
        cds.search(search.place?.latitude, search.place?.longitude, defaultRadius, search.start, search.end)
      );
      setResults(resp);
    }
    fetchHotels();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator animating={!results} size="large" color="rgb(82,136,216)" />
      <FlatList
        style={styles.list}
        data={results?.Hotels}
        renderItem={({ item }) => {
          return <HotelCard item={item} onPress={(item) => console.log("clicked")} />;
        }}
        keyExtractor={(item: Hotel) => "" + item.HtlId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  list: {},
});

const mapStateToProps = (state: GlobalState) => ({
  search: getSearch(state),
});

const mapDispatchToProps = (dispatch: Dispatch<SearchActions>) => ({
  dispatchUpdateSearch: (search: Search) => dispatch(createUpdateSearchAction(search)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultScreen);
