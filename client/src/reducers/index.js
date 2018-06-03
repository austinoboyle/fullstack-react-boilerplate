import { combineReducers } from "redux";
// COMBINED REDUCERS
import { someReducer } from "./someReducer";

export default combineReducers({
    someName: someReducer
});
