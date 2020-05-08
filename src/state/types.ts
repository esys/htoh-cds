export enum ActionType {
  ADD_HOTEL = "ADD_HOTEL",
  DELETE_HOTEL = "DELETE_HOTEL",
  UPDATE_SEARCH = "UPDATE_SEARCH",
  UPDATE_HOTEL = "UPDATE_HOTEL",
}

export interface BaseAction<P> {
  type: string;
  payload: P;
}
