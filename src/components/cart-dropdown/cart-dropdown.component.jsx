import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';

import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';


const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutPageHandler = () => {
        navigate('/checkout');
    }

    return(
        <CartDropdownContainer>
            <CartItems >
                {
                    cartItems.length ? (
                        cartItems.map((item) => (
                            <CartItem cartItem={item} key={item.id}/>
                        ))
                    ): (
                        <EmptyMessage>Your Cart is Empty</EmptyMessage>
                    )
                }
            </CartItems>
            <Button onClick={goToCheckoutPageHandler}>CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;