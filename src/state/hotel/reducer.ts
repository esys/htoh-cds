import produce from "immer";
import { HotelActions, AddHotelAction } from "./actions";
import { ActionType } from "../types";
import initialState from "./initialState";

export interface Hotel {
  id: string;
  name: string;
  address: string;
}

export interface HotelMap {
  [id: string]: Hotel;
}

export interface HotelState {
  byId: HotelMap;
  allIds: string[];
}

export default (state: HotelState = initialState, action: HotelActions) => {
  return produce(state, (draft: HotelState) => {
    switch (action.type) {
      case ActionType.ADD_HOTEL: {
        const hotel = action.payload as Hotel;
        if (!(hotel.id in state.byId)) {
          draft.byId[hotel.id] = hotel;
          draft.allIds.push(hotel.id);
          break;
        }
      }
      case ActionType.DELETE_HOTEL: {
        const id = action.payload as string;
        const index = draft.allIds.findIndex((i) => i === id);
        draft.allIds.splice(index, 1);
        delete draft.byId[id];
        break;
      }
      default: {
      }
    }
  });
};
