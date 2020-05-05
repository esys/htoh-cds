import cdsSearch from "./search.example.json";

export default class MockCds {
  search = (
    latitude,
    longitude,
    radius,
    checkin,
    checkout,
    guest = 1,
    room = 1,
    currency = "EUR",
    language = "FR",
    radiusMeasure = "K"
  ) => {
    return Promise.resolve({
      status: 200,
      ok: true,
      json: () => {
        const json = cdsSearch;
        return JSON.parse(json);
      },
    });
  };
}
