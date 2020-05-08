import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import searchReducer from "./search/reducer";
import hotelReducer from "./hotel/reducer";
import rootSaga from "../sagas";

const rootReducer = combineReducers({
  search: searchReducer,
  hotel: hotelReducer,
});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

export type GlobalState = ReturnType<typeof rootReducer>;
export default store;
