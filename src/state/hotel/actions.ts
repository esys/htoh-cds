import { ActionType, BaseAction } from "../types";
import { Hotel } from "./reducer";

export type AddHotelAction = BaseAction<Hotel>;

export type DeleteHotelAction = BaseAction<string>;

export const createAddHotelAction = (hotel: Hotel): AddHotelAction => ({ type: ActionType.ADD_HOTEL, payload: hotel });
export const createDeleteHotelAction = (id: string): DeleteHotelAction => ({
  type: ActionType.DELETE_HOTEL,
  payload: id,
});

export type HotelActions = AddHotelAction | DeleteHotelAction;
