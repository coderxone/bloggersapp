import { combineReducers } from "redux";
import products from "./productReducer";
import reducerStore from './store'

export default combineReducers({
  products,
  reducerStore
});
