import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import hotelReducer from "./hotel/reducer";
import searchReducer from "./search/reducer";
import rootSaga from "../sagas";

const rootReducer = combineReducers({
  hotel: hotelReducer,
  search: searchReducer,
});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

export type GlobalState = ReturnType<typeof rootReducer>;
export default store;
