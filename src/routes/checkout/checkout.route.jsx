import './checkout.styles.scss';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, selectPaymentCost } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';
import CurrencyPrice from '../../components/currency/currency';


const Checkout = () => {
    const dispatch = useDispatch();
    dispatch(setIsCartOpen(false));
    const paymentCost = useSelector(selectPaymentCost);
    const cartItems = useSelector(selectCartItems);

    return(
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {
                    cartItems.map((cartItem) => (
                    <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                    ))
            }
            <div className='total'>
                <span>Total Amount: <CurrencyPrice price={paymentCost} /></span>
            </div>
        </div>
    )
}

export default Checkout;