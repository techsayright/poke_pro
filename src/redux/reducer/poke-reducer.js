import { constants } from "../constant/constant";

const init = {
  CurrentUrl: null,
  isItTimeToRunAPI: true,
  pokeData: [],
  preUrl: null,
  particularPokoAdded: {},
};

export const pokeReducer = (state = init, action) => {
  switch (action.type) {
    /******************* 
    @Purpose : changing current url
    @Parameter : {}
    @Author : DARSH
    ******************/
    case constants.POKE_URL:
      return { ...state, CurrentUrl: action.CurUrl };

    /******************* 
    @Purpose : changing isItTimeToRunAPI to true or false
    @Parameter : {}
    @Author : DARSH
    ******************/
    case constants.RUN_API:
      return { ...state, isItTimeToRunAPI: action.booleanVal };

    /******************* 
    @Purpose : adding pokemon data
    @Parameter : {}
    @Author : DARSH
    ******************/
    case constants.POKE_DATA:
      return { ...state, pokeData: [...action.data] };

    /******************* 
    @Purpose : adding pre url
    @Parameter : {}
    @Author : DARSH
    ******************/
    case constants.PRE_URL:
      return { ...state, preUrl: action.preUrl };

    /******************* 
    @Purpose : check that particular poko is added to fav or not
    @Parameter : {}
    @Author : DARSH
    ******************/
    case constants.PARTICULAR_POKO:
      if (state.particularPokoAdded[`${action.id}a`]) {
        return {
          ...state,
          particularPokoAdded: {
            ...state.particularPokoAdded,
            [`${action.id}a`]: null,
          },
        };
      }
      return {
        ...state,
        particularPokoAdded: {
          ...state.particularPokoAdded,
          [`${action.id}a`]: action.id,
        },
      };

    /******************* 
    @Purpose : check that particular poko is added to fav or not from fire
    @Parameter : {}
    @Author : DARSH
    ******************/
    case constants.IS_ADDED_FAV_FRM_FIREBASE:
      return { ...state, particularPokoAdded: { ...action.isAdded } };

    default:
      return state;
  }
};
