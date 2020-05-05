import { ActionType, BaseAction } from "../types";
import { Search } from "./reducer";

export type UpdateSearchAction = BaseAction<Search>;

export const createUpdateSearchAction = (search: Search): UpdateSearchAction => ({
  type: ActionType.UPDATE_SEARCH,
  payload: search,
});

export type SearchActions = UpdateSearchAction; // | UpdateSearchAction;
