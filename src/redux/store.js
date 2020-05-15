import { createStore } from "redux";
import combineReducers from "./combineReducers";

// к data добавлена строка для отображения в расширении Redux
export default createStore(
  combineReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
