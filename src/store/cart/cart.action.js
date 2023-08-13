import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

//Helper Functions
const findCartItem = (cartItems, cartItemToFind) => {
    return cartItems.find((cartItem) => cartItem.id === cartItemToFind.id);
}

const clearCartItem = (cartItems, deleteCartItem) => {
    return cartItems.filter((cartItem) => cartItem.id !== deleteCartItem.id);
}

const changeQuantity = (cartItems, cartItemToChange, quantity) => {
    return cartItems.map((cartItem) => cartItem.id === cartItemToChange.id ? 
        {...cartItem, quantity: cartItem.quantity + quantity}:
        cartItem
        );
}

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = findCartItem(cartItems,productToAdd);

    if(existingCartItem){
        return changeQuantity(cartItems, productToAdd, 1);
    }

    //New Item
    return [...cartItems, { ...productToAdd, quantity:1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = findCartItem(cartItems, cartItemToRemove);

    if(existingCartItem.quantity === 1){
        return clearCartItem(cartItems,cartItemToRemove);
    }
    else{
        return changeQuantity(cartItems, cartItemToRemove, -1);
    }
}


//Public Functions
export const setIsCartOpen = (bool) => createAction(CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN, bool);

export const addItemToCart = (cartItems,productToAdd) => {
    const newCartItems = (addCartItem(cartItems,productToAdd));
    return createAction(CART_ACTION_TYPES.SET_CART_ITEM, newCartItems);
} 

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = (removeCartItem(cartItems, cartItemToRemove));
    return createAction(CART_ACTION_TYPES.SET_CART_ITEM, newCartItems);
}

export const clearItemFromCart = (cartItems, cartItemToDelete) => {
   const newCartItems = (clearCartItem(cartItems,cartItemToDelete));
   return createAction(CART_ACTION_TYPES.SET_CART_ITEM, newCartItems);
}


