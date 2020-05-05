import React, { Dispatch } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Input } from "react-native-elements";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { getLogger } from "../../config/logging";
import GooglePlacesApi, { Prediction, AutocompleteResponse, DetailsReponse } from "../api/google-places/places";
import GoogleGeocodingApi, { GeocodingResponse } from "../api/google-geocoding/geocoding";
import { FlatList } from "react-native-gesture-handler";
import { PlaceCard } from "./PlaceCard";
import { getPayload } from "../api/common";
import { findCurrentLocation } from "../util/location";
import { Place, Search } from "../state/search/reducer";
import { connect } from "react-redux";
import { getSearch } from "../state/search/selectors";
import { GlobalState } from "../state/store";
import { SearchActions, createUpdateSearchAction } from "../state/search/actions";

const logger = getLogger("PlaceForm");

type Props = {
  navigation: any;

  // From Redux
  dispatchUpdateSearch: (search: Search) => void;
  search: Search;
};

type State = {
  currentPosition?: Place;
  predictions?: Prediction[];
  text?: string;
};

class PlaceForm extends React.Component<Props, State> {
  state: State = {};
  geocoder = new GoogleGeocodingApi();
  placesApi = new GooglePlacesApi();

  componentDidMount() {
    this.findCurrentLocation();

    // prefill the search field
    if (this.props.search.place?.city) {
      this.onTextChange(this.props.search.place?.city);
    }
  }

  async findCurrentLocation() {
    const { latitude, longitude } = (await findCurrentLocation()).coords;
    this.setState({ currentPosition: { latitude, longitude } });

    const geocoding = await getPayload<GeocodingResponse>(this.geocoder.reverse(latitude, longitude));
    let city = this.geocoder.findCity(geocoding);

    if (!city) {
      city = "Unknown";
    }
    this.setState({ currentPosition: { latitude, longitude, city: city } });
  }

  getPositionText() {
    let place = "Unknown";
    if (this.state.currentPosition?.city) {
      place = this.state.currentPosition?.city;
    }
    return `${place}`;
  }

  useCurrentLocationPress() {
    const { navigation, dispatchUpdateSearch } = this.props;
    if (!this.state.currentPosition) return;

    this.setState({ text: this.state.currentPosition?.city, predictions: [] });
    dispatchUpdateSearch({ place: this.state.currentPosition });

    navigation.goBack();
  }

  async onPlaceListSelect(item: Prediction) {
    const { navigation, dispatchUpdateSearch } = this.props;

    // need to find its lat/lng to build a proper Place object
    const detailsResp = await getPayload<DetailsReponse>(this.placesApi.detailPlaces(item.place_id));
    const { lat, lng } = detailsResp.result.geometry.location;
    const place = { city: item.description, latitude: lat, longitude: lng };

    this.setState({ text: item.description, predictions: [] });
    dispatchUpdateSearch({ place });

    navigation.goBack();
  }

  renderItem(item: Prediction) {
    return (
      <PlaceCard
        item={item}
        onPress={() => {
          this.onPlaceListSelect(item);
        }}
      />
    );
  }

  renderSeparator() {
    return <View style={styles.separator} />;
  }

  async onTextChange(text: string) {
    this.setState({ text });

    // update predictions
    const { currentPosition } = this.state;
    let opt: { [key: string]: string } = { types: "(regions)" };
    if (currentPosition) {
      opt["location"] = `${currentPosition.latitude},${currentPosition.longitude}`;
    }
    const autocompleteResp = await getPayload<AutocompleteResponse>(this.placesApi.autocompletePlaces(text, opt));

    const predictions = autocompleteResp.predictions.filter(
      (p: any) => p.types.includes("locality") || p.types.includes("sublocality")
    );

    this.setState({ predictions });
  }

  render() {
    const { currentPosition, text, predictions: places } = this.state;

    return (
      <View style={styles.container}>
        <Input
          value={text}
          placeholder="Find your stay place"
          leftIcon={<Icon name="search" color="black" size={20} />}
          onChangeText={(text) => this.onTextChange(text)}
        />
        <TouchableOpacity disabled={!currentPosition?.city} onPress={() => this.useCurrentLocationPress()}>
          <View style={[styles.buttonContainer, !currentPosition?.city ? styles.disabled : styles.enabled]}>
            <View style={styles.buttonLine}>
              <Icon name="gps-fixed" size={24} color="white" />
              <Text style={styles.buttonMainText}> Use my current position</Text>
            </View>
            <View style={styles.buttonLine}>
              <Text style={styles.buttonSecondaryText}>{this.getPositionText()}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <FlatList
          style={styles.list}
          data={places}
          renderItem={({ item }) => this.renderItem(item)}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item: any) => item.place_id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  buttonContainer: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLine: {
    flexDirection: "row",
  },
  buttonTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonMainText: {
    fontSize: 16,
    color: "white",
  },
  buttonSecondaryText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  disabled: {
    backgroundColor: "rgb(227,229,231)",
    color: "rgb(167,172,179)",
  },
  enabled: {
    backgroundColor: "rgb(82,136,216)",
    color: "white",
  },
  list: {
    marginTop: 20,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "rgb(227,229,231)",
    marginVertical: 5,
  },
});

const mapStateToProps = (state: GlobalState) => ({
  search: getSearch(state),
});

const mapDispatchToProps = (dispatch: Dispatch<SearchActions>) => ({
  dispatchUpdateSearch: (search: Search) => dispatch(createUpdateSearchAction(search)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceForm);
