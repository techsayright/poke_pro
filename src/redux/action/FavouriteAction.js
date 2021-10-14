import { constants } from "../constant/constant";

export const AddToFav = (addedData) => {
  return {
    type: constants.ADD_TO_FAV,
    addedData,
  };
};

export const RmvFrmFav = (id) => {
  return {
    type: constants.REMOVE_FRM_FAV,
    id,
  };
};
