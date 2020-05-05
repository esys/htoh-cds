import { GlobalState } from "../store";
import { Hotel } from "./reducer";

export const getHotels = (state: GlobalState): Hotel[] => {
  return state.hotel.allIds.map((id) => {
    return state.hotel.byId[id];
  });
};
