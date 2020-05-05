export enum ActionType {
  ADD_HOTEL = "ADD_HOTEL",
  DELETE_HOTEL = "DELETE_HOTEL",
  UPDATE_SEARCH = "UPDATE_SEARCH",
}

export interface BaseAction<P> {
  type: string;
  payload: P;
}
