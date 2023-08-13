import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
  currentUser: null
};

/*
    Set current user: payload
*/

export const userReducer = (state = INITIAL_STATE, action = {}) => {
  const {type, payload} = action;

  switch(type){
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        //Keep Previous States as it is, just update the values we care about
        ...state,
        currentUser: payload
      }
    default:
      return state;
  }
};

