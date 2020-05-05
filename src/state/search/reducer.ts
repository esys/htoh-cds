import produce from "immer";
import { ActionType } from "../types";
import initialState from "./initialState";
import { SearchActions, UpdateSearchAction } from "./actions";

export interface Search {
  place?: Place;
  start?: string;
  end?: string;
}

export type Place = {
  latitude: number;
  longitude: number;
  city?: string;
};

export interface SearchState {
  search: Search;
}

export default (state: SearchState = initialState, action: SearchActions) => {
  return produce(state, (draft: SearchState) => {
    switch (action.type) {
      case ActionType.UPDATE_SEARCH: {
        draft.search = { ...state.search, ...action.payload };
        break;
      }
      default: {
      }
    }
  });
};
