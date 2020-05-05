import { all } from "redux-saga/effects";
import { watchRefreshStep } from "./hotel";

export default function* rootSaga() {
  yield all([watchRefreshStep()]);
}
