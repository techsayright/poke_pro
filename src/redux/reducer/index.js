import { combineReducers } from "redux";
import { favReducer } from "./fav-reducer";
import { pokeReducer } from "./poke-reducer";

export const reducer = combineReducers({
  fav: favReducer,
  url: pokeReducer,
});
