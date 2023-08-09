import { createContext, useReducer } from "react";
import {createAction} from "../utils/reducer/reducer.utils";



const findCartItem = (cartItems, cartItemToFind) => {
    return cartItems.find((cartItem) => cartItem.id === cartItemToFind.id);
}

const deleteCartItem = (cartItems, deleteCartItem) => {
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
        return deleteCartItem(cartItems,cartItemToRemove);
    }
    else{
        return changeQuantity(cartItems, cartItemToRemove, -1);
    }
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemToCart: () => {},
    deleteItemToCart: () => {},
    cartCount: 0,
    paymentCost: 0,
});

export const CART_ACTION_TYPES = {
    TOGGLE_IS_CART_OPEN: 'TOGGLE_IS_CART_OPEN',
    SET_CART_ITEM: 'SET_CART_ITEM'
}

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEM:
            return {
                ...state,
                ...payload,
            };
        case CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN:
            return {
                ...state,
                //Can also do this: isCartOpen: !state.isCartOpen
                isCartOpen: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
}

const INITIAL_STATE = {
    cartItems: [],
    cartCount: 0,
    paymentCost: 0,
    isCartOpen: false
}



export const CartProvider = ({children}) => {

    const [{cartItems, cartCount, paymentCost, isCartOpen}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) =>{
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity,0);
        const newPaymentCost = newCartItems.reduce((total,cartItem) => total + (cartItem.quantity*cartItem.price) , 0);

        dispatch(createAction(
            CART_ACTION_TYPES.SET_CART_ITEM,
            {
                cartItems: newCartItems, 
                cartCount: newCartCount, 
                paymentCost: newPaymentCost
            }
        ));
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(
            CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN,
            bool
        ));
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = (addCartItem(cartItems,productToAdd));
        updateCartItemsReducer(newCartItems);
    } 

    const removeItemToCart = (cartItemToRemove) => {
        const newCartItems = (removeCartItem(cartItems, cartItemToRemove));
        updateCartItemsReducer(newCartItems);
    }

    const deleteItemToCart = (cartItemToDelete) => {
       const newCartItems = (deleteCartItem(cartItems,cartItemToDelete));
       updateCartItemsReducer(newCartItems);
    }

    
    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart,
        removeItemToCart,
        deleteItemToCart,
        cartItems, 
        cartCount, 
        paymentCost
    };

    
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}