import React, { Dispatch, FunctionComponent, useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { GlobalState } from "../state/store";
import { getSearch } from "../state/search/selectors";
import { Search } from "../state/search/reducer";
import { connect } from "react-redux";
import CdsApi, { SearchResponse, Hotel } from "../api/cds/cds";
import { getLogger } from "../../config/logging";
import { getJSON } from "../api/common";
import { FlatList } from "react-native-gesture-handler";
import { HotelCard } from "../components/search/HotelCard";
import { createUpdateHotelAction, HotelActions } from "../state/hotel/actions";

const defaultRadius = 30;
const logger = getLogger("SearchResultScreen");

type Props = {
  navigation: any;

  // From Redux
  search: Search;
  dispatchUpdateHotel: (hotel: Hotel) => void;
};

const SearchResultScreen: FunctionComponent<Props> = ({ navigation, search, dispatchUpdateHotel }: Props) => {
  const cds = new CdsApi();
  const [results, setResults] = useState<SearchResponse>();

  const onHotelSelect = useCallback((hotel: Hotel) => {
    dispatchUpdateHotel(hotel);
    navigation.navigate("RoomResults");
  }, []);

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
      {!results && (
        <ActivityIndicator style={styles.loader} animating={!results} size="large" color="rgb(82,136,216)" />
      )}
      <FlatList
        style={styles.list}
        data={results?.Hotels}
        renderItem={({ item }) => {
          return <HotelCard item={item} onHotelSelect={onHotelSelect} />;
        }}
        keyExtractor={(item: Hotel) => "" + item.HtlId}
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
  search: getSearch(state),
});

const mapDispatchToProps = (dispatch: Dispatch<HotelActions>) => ({
  dispatchUpdateHotel: (hotel: Hotel) => dispatch(createUpdateHotelAction(hotel)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultScreen);
