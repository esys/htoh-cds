import CdsApi from "./cds";
import moment from "moment";

test("search hotels in Tokyo", () => {
  jest.setTimeout(30000);

  const cds = new CdsApi();
  const latTokyo = "35.680578";
  const longTokyo = "139.76876";

  return cds
    .search(latTokyo, longTokyo, 10, moment().format("YYYY-MM-DD"), moment().add(1, "days").format("YYYY-MM-DD"))
    .then((resp) => {
      expect(resp.status == 200);
      return resp.json();
    })
    .then((json) => {
      expect(json.NumberOfResult).toBeDefined();
    });
});
