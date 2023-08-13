import { CART_ACTION_TYPES } from "./cart.types";

const INITIAL_STATE = {
    cartItems: [],
    isCartOpen: false
}

export const cartReducer = (state = INITIAL_STATE, action = {}) => {
    const {type, payload} = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEM:
            return {
                ...state,
                cartItems: payload
            };
        case CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN:
            return {
                ...state,
                //Can also do this: isCartOpen: !state.isCartOpen
                isCartOpen: payload
            };
        default:
            return state;
    }
}