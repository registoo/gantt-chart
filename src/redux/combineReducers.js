import { combineReducers } from "redux";
import mainReducer from "./mainReducer/reducer.js";
import fullDataReducer from "./fullDataReducer/index.js";

export default combineReducers({ mainReducer, fullDataReducer });
