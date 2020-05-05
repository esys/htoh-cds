import { takeEvery } from "redux-saga/effects";
import { DeleteHotelAction } from "../state/hotel/actions";
import { ActionType } from "../state/types";
import { getLogger } from "../../config/logging";

const logger = getLogger("HotelSaga");

export function* watchRefreshStep() {
  yield takeEvery(ActionType.DELETE_HOTEL, handleDeleteHotel);
}

function* handleDeleteHotel(action: DeleteHotelAction) {
  const hotelId = action.payload;
  logger.info(`deleted hotel id=${hotelId}`);

  //const data = yield call(api.call, param1, param2);
  //yield put(newAction);
}
