import { createContext, useEffect, useState } from "react";



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

export const CartProvider = ({children}) => {
    const [isCartOpen,setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [paymentCost, setPaymentCost] = useState(0);


    //Keep useEffect for 1 item - Standard
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity,0);
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const newPaymentCost = cartItems.reduce((total,cartItem) => total + (cartItem.quantity*cartItem.price) , 0);
        setPaymentCost(newPaymentCost);

    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd));
    } 

    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const deleteItemToCart = (cartItemToDelete) => {
        setCartItems(deleteCartItem(cartItems,cartItemToDelete));
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