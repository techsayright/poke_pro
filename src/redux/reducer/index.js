import { combineReducers } from "redux";
import { favReducer } from "./fav-reducer";

export const reducer = combineReducers({
  fav: favReducer,
});
