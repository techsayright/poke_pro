import { constants } from "../constant/constant";

export const pokeUrlAction = (CurUrl) => {
  return {
    type: constants.POKE_URL,
    CurUrl,
  };
};

export const runAPIAction = (booleanVal) => {
  return {
    type: constants.RUN_API,
    booleanVal,
  };
};

export const addPokeData = (data) => {
  return {
    type: constants.POKE_DATA,
    data,
  };
};

export const preUrlAction = (preUrl) => {
  return {
    type: constants.PRE_URL,
    preUrl,
  };
};
