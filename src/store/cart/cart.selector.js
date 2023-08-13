import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
)

const newCartCount = (cartItems) => cartItems.reduce((total, cartItem) => total + cartItem.quantity,0);
const newPaymentCost = (cartItems) => cartItems.reduce((total,cartItem) => total + (cartItem.quantity*cartItem.price) , 0);


//Public methods
export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
)

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => newCartCount(cartItems)
)
export const selectPaymentCost = createSelector(
    [selectCartItems],
    (cartItems) => newPaymentCost(cartItems)
)

