import placesConfig from "../../../config/google-places.local.json";
import { QueryStringParameters } from "../common";

// https://developers.google.com/maps/documentation/geocoding/intro#reverse-example
export interface GeocodingResponse {
  status: string;
  results: GeocodingResult[];
}

export interface GeocodingResult {
  address_components: AddressComponent[];
  formatted_address: string;
  place_id: string;
  types: string[];
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export default class GoogleGeocodingApi {
  private static URL = "https://maps.googleapis.com/maps/api/geocode/json";

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

  public reverse(latitude: number, longitude: number) {
    const params = { latlng: `${latitude},${longitude}` };
    return this.callApi(GoogleGeocodingApi.URL, params);
  }

  /**
   * Return a string with the "City" or the "City, Country" from a geocoding response
   * @param geocoding
   */
  public findCity(geocoding: GeocodingResponse): string | null {
    for (const result of geocoding.results) {
      const localityAc = result.address_components.find((ac: AddressComponent) =>
        ac.types.some((t: string) => t === "locality")
      );
      const countryAc = result.address_components.find((ac: AddressComponent) =>
        ac.types.some((t: string) => t === "country")
      );

      if (localityAc) {
        let ret = localityAc.long_name;
        if (countryAc) {
          ret += ", " + countryAc.long_name;
        }
        return ret;
      }
    }
    return null;
  }
}
