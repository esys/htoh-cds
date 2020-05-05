export enum ActionType {
  ADD_HOTEL = "ADD_HOTEL",
  DELETE_HOTEL = "DELETE_HOTEL",
}

export interface BaseAction<P> {
  type: string;
  payload: P;
}
