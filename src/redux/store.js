import { createStore } from "redux";
import rootReducer from "./reducers";

// к data добавлена строка для отображения в расширении Redux
export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
