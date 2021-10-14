import { constants } from "../constant/constant";

const init = {
  favData: [],
};

export const favReducer = (state = init, action) => {
  switch (action.type) {
    case constants.ADD_TO_FAV:
      return { ...state, favData: [...state.favData, action.addedData] };
    case constants.REMOVE_FRM_FAV:
      let filteredData = state.favData.filter(
        (poke) => +poke.id !== +action.id
      );
      return { ...state, favData: [...filteredData] };
    default:
      return state;
  }
};
