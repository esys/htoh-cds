import { GlobalState } from "../store";
import { Search } from "./reducer";

export const getSearch = (state: GlobalState): Search => {
  return state.search.search;
};
