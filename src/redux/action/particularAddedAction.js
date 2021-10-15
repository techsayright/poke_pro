import { constants } from "../constant/constant";

export const particularPokoAddedAction = (id) => {
  return {
    type: constants.PARTICULAR_POKO,
    id,
  };
};

export const particularPokoAddedActionFromFire = (isAdded) => {
  return {
    type: constants.IS_ADDED_FAV_FRM_FIREBASE,
    isAdded,
  };
};
