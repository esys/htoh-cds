import { AppState } from "../store";
import { Hotel } from "./reducer";

export const getHotels = (state: AppState): Hotel[] => {
  return state.hotel.allIds.map((id) => {
    return state.hotel.byId[id];
  });
};
