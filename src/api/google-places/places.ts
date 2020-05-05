import placesConfig from "../../../config/google-places.local.json";
import { GeocodingResult } from "../google-geocoding/geocoding";
import { QueryStringParameters } from "../common";

enum PlacesResources {
  SEARCH = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
  AUTOCOMPLETE = "https://maps.googleapis.com/maps/api/place/autocomplete/json",
  DETAILS = "https://maps.googleapis.com/maps/api/place/details/json",
  PHOTOS = "https://maps.googleapis.com/maps/api/place/photo",
  NEARBY = "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
}

export enum RankBy {
  PROMINENCE = "prominence",
  DISTANCE = "distance",
}

// https://developers.google.com/places/web-service/autocomplete?hl=fr#place_autocomplete_responses
export interface AutocompleteResponse {
  status: string;
  predictions: Prediction[];
}

export interface Prediction {
  description: string;
  place_id: string;
  types: string[];
}

// https://developers.google.com/places/web-service/details?hl=fr#PlaceDetailsResponses
export interface DetailsReponse {
  status: string;
  result: DetailsResult;
}

export interface DetailsResult {
  formatted_address: string;
  geometry: Geometry;
}

export interface Geometry {
  location: Location;
}

export interface Location {
  lat: number;
  lng: number;
}

export default class GooglePlacesApi {
  private buildUrl(url: string, params: QueryStringParameters) {
    const paramsWithKey: QueryStringParameters = { ...params, key: placesConfig.key };
    const queryString = Object.keys(paramsWithKey)
      .map((key) => key + "=" + paramsWithKey[key])
      .join("&");
    return `${url}?${queryString}`;
  }

  private callApi(url: string, params: QueryStringParameters) {
    return fetch(this.buildUrl(url, params));
  }

  public searchPlaces(input: string, others = {}) {
    const params = { input, inputtype: "textquery", ...others };
    return this.callApi(PlacesResources.SEARCH, params);
  }

  public detailPlaces(place_id: string, others = {}) {
    const params = { place_id, ...others };
    return this.callApi(PlacesResources.DETAILS, params);
  }

  public autocompletePlaces(input: string, others = {}) {
    const params = { input, ...others };
    return this.callApi(PlacesResources.AUTOCOMPLETE, params);
  }

  public searchNearby(latitude: number, longitude: number, radius: number, others = {}) {
    const params = { location: `${latitude},${longitude}`, radius: "" + radius, ...others };
    return this.callApi(PlacesResources.NEARBY, params);
  }

  public searchNearbyRanked(latitude: number, longitude: number, rankBy: string = RankBy.DISTANCE, others = {}) {
    const params = { location: `${latitude},${longitude}`, rankBy: rankBy.toString(), ...others };
    return this.callApi(PlacesResources.NEARBY, params);
  }
}
