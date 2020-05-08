import { ActionType, BaseAction } from "../types";
import { Hotel } from "../../api/cds/cds";

export type UpdateHotelAction = BaseAction<Hotel>;

export const createUpdateHotelAction = (hotel: Hotel): UpdateHotelAction => ({
  type: ActionType.UPDATE_HOTEL,
  payload: hotel,
});

export type HotelActions = UpdateHotelAction; // | OtherHotelAction;
