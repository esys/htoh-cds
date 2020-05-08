import { GlobalState } from "../store";
import { Hotel } from "../../api/cds/cds";

export const getHotel = (state: GlobalState): Hotel | undefined => {
  return state.hotel.hotel;
};
