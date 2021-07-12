import { combineReducers } from "redux";
import products from "./productReducer";
import reduxStorage from './store'

export default combineReducers({
  products,
  reduxStorage
});
