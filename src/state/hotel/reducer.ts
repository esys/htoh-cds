import produce from "immer";
import { ActionType } from "../types";
import initialState from "./initialState";
import { Hotel } from "../../api/cds/cds";
import { HotelActions } from "./actions";

export interface HotelState {
  hotel?: Hotel;
}

export default (state: HotelState = initialState, action: HotelActions) => {
  return produce(state, (draft: HotelState) => {
    switch (action.type) {
      case ActionType.UPDATE_HOTEL: {
        draft.hotel = { ...state.hotel, ...action.payload };
        break;
      }
      default: {
      }
    }
  });
};
