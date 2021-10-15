import { constants } from "../constant/constant";

const init = {
  favData: [],
};

export const favReducer = (state = init, action) => {
  switch (action.type) {
    /******************* 
    @Purpose : Add to favourite
    @Parameter : {obj}
    @Author : DARSH
    ******************/
    case constants.ADD_TO_FAV:
      return { ...state, favData: [...state.favData, action.addedData] };

    /******************* 
    @Purpose : Add to favourite from firebase
    @Parameter : {obj}
    @Author : DARSH
    ******************/
    case constants.ADD_FAV_FRM_FIREBASE:
      return { ...state, favData: [...action.Data] };

    /******************* 
    @Purpose : remove from fav
    @Parameter : {obj}
    @Author : DARSH
    ******************/
    case constants.REMOVE_FRM_FAV:
      let filteredData = state.favData.filter(
        (poke) => +poke.id !== +action.id
      );
      return { ...state, favData: [...filteredData] };

    default:
      return state;
  }
};
